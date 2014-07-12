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
import Data.Char (isDigit)
import Data.List.Split (splitWhen)
import Data.Maybe (fromMaybe) 
import Data.Text (Text)
import qualified Data.Text as T
import Database.PostgreSQL.Simple (Connection,(:.)(..))
import Database.PostgreSQL.Simple.FromRow (FromRow,fromRow,field)
import Database.PostgreSQL.Simple.ToRow (ToRow,toRow)
import Database.PostgreSQL.Simple.ToField (ToField,toField)
import Database.PostgreSQL.Simple.FromField (FromField,Conversion,fromField)
import Database.PostgreSQL.Simple.SqlQQ (sql)
import Snap.Snaplet.PostgresqlSimple (Postgres,Only(Only),fromOnly,query,query_,execute_)

import Db.Internal

-- Some lousy newtypes so we can clean up on the cassava side.
newtype CsvInt    = CsvInt Int deriving (Eq,Show)
makeWrapped ''CsvInt
instance ToJSON CsvInt where
  toJSON = toJSON . (^. _Wrapped) 
instance FromJSON CsvInt where
  parseJSON = fmap CsvInt . parseJSON
  
newtype CsvDouble = CsvDouble Double deriving (Eq,Show)
makeWrapped ''CsvDouble
instance ToJSON CsvDouble where
  toJSON = toJSON . (^. _Wrapped) 
instance FromJSON CsvDouble where
  parseJSON = fmap CsvDouble . parseJSON

data Facility = Facility
  { _parkNumber :: Text
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

data FacilityTerm = FacilityTerm
  { _term :: Text
  , _termType :: Text
  } deriving (Eq,Show)
makeLenses ''FacilityTerm
deriveJSON (aesonThOptions Nothing) ''FacilityTerm

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

updateFacilityTerms :: Db ()
updateFacilityTerms = execute_ q >> return ()
  where q = [sql|
    INSERT INTO park_facility_term (term,type) (
      SELECT DISTINCT park_name, 'Park' FROM park_facility
      UNION
      SELECT DISTINCT node_use, 'Facility Category' FROM park_facility
      UNION
      SELECT DISTINCT item_type, 'Facility' FROM park_facility
    )|]

searchFacilityTerms :: Text -> Db [FacilityTerm]
searchFacilityTerms searchText = query
  "SELECT term,type FROM park_facility_term WHERE term ILIKE ?"
  (Only $ T.concat ["%",searchText,"%"])

parkFeatures :: Db [FacilityTerm]
parkFeatures = query_
  "SELECT term,type FROM park_facility_term WHERE type IN ('Facility Category','Facility')"

searchFacility :: Text -> Db [(Int,Facility)]
searchFacility searchText = fmap (\ ((Only i) :. f) -> (i,f)) <$> query
   [sql|
     SELECT
       id, park_number,park_name,node_id,node_use,node_name,item_id,item_type,item_name,
       description,easting,northing,orig_fid,ST_AsText(coords)
     FROM park_facility
     WHERE park_name ILIKE ? OR node_use ILIKE ? OR item_type ILIKE ?
     |]
  (search,search,search)  
   where
     search = T.concat ["%",searchText,"%"]

instance FromField CsvInt where
  fromField f bs = fmap (^. _Unwrapped) (fromField f bs :: Conversion Int)

instance ToField CsvInt where
  toField f = toField (f ^. _Wrapped :: Int)

instance FromField CsvDouble where
  fromField f bs = fmap (^. _Unwrapped) (fromField f bs :: Conversion Double)

instance ToField CsvDouble where
  toField f = toField (f ^. _Wrapped :: Double)

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

instance FromRow FacilityTerm where
  fromRow = FacilityTerm
    <$> field
    <*> field
    
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
