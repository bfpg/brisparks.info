{-# LANGUAGE FlexibleInstances, MultiParamTypeClasses,OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes, TypeOperators #-}
{-# LANGUAGE TemplateHaskell, TypeFamilies, TupleSections #-}
module Db.Facility where

import Control.Applicative ((<$>),(<*>))
import Control.Error (headMay)
import Control.Lens (_Wrapped,_Unwrapped,_Show,makeLenses,makeWrapped,(^.))
import Control.Monad.Reader (ReaderT)
import Data.Aeson (ToJSON,FromJSON,toJSON,parseJSON)
import Data.Aeson.TH (deriveJSON)
import Data.Bifunctor (first)
import Data.Char (isDigit)
import Data.Foldable(fold)
import Data.List (nub)
import Data.List.Split (splitWhen)
import Data.Maybe (fromMaybe) 
import Data.Text (Text)
import qualified Data.Text as T
import Data.Traversable (sequenceA)
import Database.PostgreSQL.Simple (Connection,(:.)(..))
import Database.PostgreSQL.Simple.FromRow (FromRow,fromRow,field)
import Database.PostgreSQL.Simple.ToRow (ToRow,toRow)
import Database.PostgreSQL.Simple.ToField (ToField,toField)
import Database.PostgreSQL.Simple.FromField (FromField,Conversion,fromField)
import Database.PostgreSQL.Simple.SqlQQ (sql)
import Snap.Snaplet.PostgresqlSimple (Postgres,Only(Only),fromOnly,query,query_,execute_)

import Db.Internal

data Facility = Facility
  { _parkNumber :: CsvInt
  , _parkName   :: Text
  , _nodeId     :: CsvInt
  , _nodeUse    :: Text
  , _nodeName   :: Text
  , _itemId     :: Text
  , _itemType   :: Text
  , _itemName   :: Text
  , _description :: Text
  , _easting     :: CsvDouble
  , _northing    :: CsvDouble
  , _origFid    :: CsvInt
  , _coords      :: (CsvDouble,CsvDouble)
  } deriving (Eq,Show)
makeLenses ''Facility
deriveJSON (aesonThOptions Nothing) ''Facility

deleteFacilities :: Db ()
deleteFacilities = execute_ "TRUNCATE park_facility" >> return ()

insertFacility :: Facility -> Db Int
insertFacility f = fromMaybe 0 . fmap fromOnly . headMay <$> query
  [sql|
   INSERT INTO park_facility (
     park_number,park_name,node_id,node_use,node_name,item_id,item_type,item_name,
     description,easting,northing,orig_fid,coords   
   ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
   RETURNING id
  |]
  f

queryParkIds :: Db [Text]
queryParkIds = fmap fromOnly <$> query_
  [sql|
    SELECT DISTINCT park_number
    FROM park_facility
  |]

queryParkFacilities :: Text -> Db [Facility]
queryParkFacilities parkId = query
  [sql|
    SELECT
      park_number,park_name,node_id,node_use,node_name,item_id,item_type,item_name,
      description,easting,northing,orig_fid,ST_AsText(coords)
    FROM park_facility
    WHERE park_number = ?
  |]
  (Only parkId)

searchShortList :: Text -> Db [(Text,Text)]
searchShortList st = do
  ps <- map ("Park",) <$> searchParkNames st
  ss <- map ("Suburb",) <$> searchParkSuburbs st
  -- TODO: Probably a bad idea that it goes ahead and does this regardless
  -- Of how many things we've found already
  as <- map (first (T.append "Suburb nearby to: ")) <$> searchParkAdjoiningSuburbs st
  return . nub $ ps ++ ss ++ as

searchParkNames :: Text -> Db [Text]
searchParkNames st = fmap fromOnly <$> query
  "SELECT DISTINCT park_name FROM park_facility WHERE park_name ILIKE ?"
  (Only $ searchTerm st)

searchParkSuburbs :: Text -> Db [Text]    
searchParkSuburbs st = fmap fromOnly <$> query
  "SELECT DISTINCT suburb FROM park_address WHERE suburb ILIKE ?"
  (Only $ searchTerm st)

-- TODO: This is shit. Could just condense this into searchSuburb.
searchParkAdjoiningSuburbs :: Text -> Db [(Text,Text)]
searchParkAdjoiningSuburbs st = query
  [sql|
    SELECT DISTINCT aj.suburb,adjoining_suburb
    adjoining_suburb aj 
    JOIN park_address pa2 ON (UPPER(aj.adjoining_suburb) = pa2.suburb)
    WHERE aj.suburb ILIKE ?
    |]
  (Only $ searchTerm st)

parkFeatures :: Text -> [Text] -> [Text] -> Db [(Text,Text)]
parkFeatures st nodeUses itemTypes = fmap id <$> query
  [sql|
   SELECT DISTINCT node_use, item_type
   FROM park_facility f LEFT JOIN park_address ON (f.park_number = a.park_number)
   WHERE park_name ILIKE ? OR suburb ILIKE ?
    |]
  (searchTerm st,searchTerm st)

searchFacility :: Text -> Db [(Int,Facility)]
searchFacility st = fmap (\ ((Only i) :. f) -> (i,f)) <$> query
   [sql|
     SELECT park_
       id, park_number,park_name,node_id,node_use,node_name,item_id,item_type,item_name,
       description,easting,northing,orig_fid,ST_AsText(coords)
     FROM park_facility f
       LEFT JOIN park_address a ON (f.park_number = a.park_number)
       LEFT JOIN ajoining_suburb
     WHERE f.park_name ILIKE ? OR a.suburb ILIKE a OR 
                                             ( 
       (SELECT 1,* FROM park_facility WHERE park_name LIKE ?)
       UNION
       (SELECT 2,* FROM park_facility LEFT JOIN WHERE  LIKE ?)
     )                                        
     |]
  (search,search,search)  
   where search =  searchTerm st

searchTerm st = T.concat ["%",st,"%"]

instance FromRow Facility where
  fromRow = Facility
    <$> field
    <*> field 
    <*> field 
    <*> field 
    <*> field 
    <*> field 
    <*> field 
    <*> field 
    <*> field 
    <*> field 
    <*> field 
    <*> field 
    <*> (parseCoords <$> field)
    where
       parseCoords = toTuple . filter (not . null) . splitWhen notDecimal . T.unpack 
       notDecimal c = not (isDigit c || c == '.')
       toTuple [long,lat] = (CsvDouble $ read long,CsvDouble $ read lat)
       toTuple _          = (CsvDouble 0,CsvDouble 0)

instance ToRow Facility where
  toRow f =
    [ toField (f ^. parkNumber)
    , toField (f ^. parkName)
    , toField (f ^. nodeId)
    , toField (f ^. nodeUse)
    , toField (f ^. nodeName)
    , toField (f ^. itemId)
    , toField (f ^. itemType)
    , toField (f ^. itemName)
    , toField (f ^. description)
    , toField (f ^. easting)
    , toField (f ^. northing)
    , toField (f ^. origFid)
    , toField (coordText (f ^. coords))
    ]
    where
      coordText :: (CsvDouble,CsvDouble) -> String
      coordText (CsvDouble(long),CsvDouble(lat)) = "POINT(" ++ show long ++ " " ++ show lat ++ ")"
