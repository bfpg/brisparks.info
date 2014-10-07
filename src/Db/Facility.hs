{-# LANGUAGE FlexibleInstances, MultiParamTypeClasses,OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes, TypeOperators #-}
{-# LANGUAGE TemplateHaskell, TypeFamilies, TupleSections #-}
module Db.Facility where

import Control.Applicative ((<$>),(<*>))
import Control.Error (headMay)
import Control.Lens (makeLenses, (^.))
import Control.Monad (mfilter, void)
import Data.Aeson.TH (deriveJSON)
import Data.Bifunctor (first)
import Data.List (nub)
import Data.Text (Text)
import qualified Data.Text as T
import Database.PostgreSQL.Simple.FromRow (FromRow,fromRow,field)
import Database.PostgreSQL.Simple.ToRow (ToRow,toRow)
import Database.PostgreSQL.Simple.ToField (toField)
import Database.PostgreSQL.Simple.SqlQQ (sql)
import Snap.Snaplet.PostgresqlSimple (In(..),Only(Only),fromOnly,query,query_,execute_)

import Db.Internal

data Facility = Facility
  { _facParkNumber :: CsvInt
  , _facParkName   :: Text
  , _nodeId     :: CsvInt
  , _nodeUse       :: Text
  , _nodeName      :: Text
  , _itemId        :: Text
  , _itemType      :: Text
  , _itemName      :: Text
  , _description   :: Text
  , _easting       :: CsvDouble
  , _northing      :: CsvDouble
  , _origFid       :: CsvInt
  , _coords        :: (CsvDouble,CsvDouble)
  } deriving (Eq,Show)
makeLenses ''Facility
deriveJSON (aesonThOptions Nothing) ''Facility

data ParkResult = ParkResult
  { _parkResultNumber :: Int
  , _parkResultName   :: Text
  , _parkResultStreet :: Text
  , _parkResultSuburb :: Text
  , _parkResultLat    :: Double
  , _parkResultLong   :: Double
  } deriving (Eq,Show)
makeLenses ''ParkResult
deriveJSON (aesonThOptions (Just "_parkResult")) ''ParkResult

deleteFacilities :: Db ()
deleteFacilities = void $ execute_ "TRUNCATE park_facility"

insertFacility :: Facility -> Db Int
insertFacility f = maybe 0 fromOnly . headMay <$> query
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
    FROM adjoining_suburb aj 
    JOIN park_address pa2 ON (UPPER(aj.adjoining_suburb) = pa2.suburb)
    WHERE aj.suburb ILIKE ?
    |]
  (Only $ searchTerm st)

parkFeatures :: Text -> [Text] -> [Text] -> Db [Text]
parkFeatures st _ _ = nub . (explode =<<) <$> query
  [sql|
   SELECT DISTINCT f.node_use, f.item_type
   FROM park_facility f
     LEFT JOIN park_address a ON (f.park_number = a.park_number)
     JOIN node_use_whitelist n ON (f.node_use = n.node_use)
     JOIN item_type_whitelist i ON (f.item_type = i.item_type)
   WHERE f.park_name ILIKE ? OR suburb ILIKE ?
  |]
  (searchTerm st,searchTerm st)
  where
    explode :: (Text,Text) -> [Text]
    explode (nu,it) = [nu,it] 

searchPark :: Maybe [String] -> Text -> Db [ParkResult]
searchPark f st = maybe noFeatureQ withFeaturesQ . mfilter null $ f
  where
    noFeatureQ = query
      [sql|
        SELECT DISTINCT f.park_number, f.park_name,street,suburb,latitude,longtitude
        FROM park_facility f LEFT JOIN park_address a ON (f.park_number = a.park_number)
        WHERE f.park_name ILIKE ? OR suburb ILIKE ? 
     |]
     (searchTerm st, searchTerm st)

    withFeaturesQ fs = query
      [sql|
        SELECT DISTINCT f.park_number, f.park_name,street,suburb,latitude,longtitude
        FROM park_facility f LEFT JOIN park_address a ON (f.park_number = a.park_number)
        WHERE (f.park_name ILIKE ? OR suburb ILIKE ?) AND (
          node_use IN ? OR item_type IN ?
       )
     |]
     (searchTerm st, searchTerm st,In fs, In fs)
getFacilities :: Int -> Db [Facility]
getFacilities parkId = query
   [sql|
     SELECT 
       park_number,park_name,node_id,node_use,node_name,item_id,item_type,item_name,
       description,easting,northing,orig_fid,ST_AsText(coords)
     FROM park_facility f
     WHERE f.park_number = ?
     |]
   (Only parkId)

searchTerm :: Text -> Text
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


instance FromRow ParkResult where
  fromRow = ParkResult
    <$> field
    <*> field 
    <*> field 
    <*> field 
    <*> field 
    <*> field 

instance ToRow Facility where
  toRow f =
    [ toField (f ^. facParkNumber)
    , toField (f ^. facParkName)
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
      coordText (CsvDouble long, CsvDouble lat) =
        "POINT(" ++ show long ++ " " ++ show lat ++ ")"
