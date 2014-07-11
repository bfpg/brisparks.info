{-# LANGUAGE FlexibleInstances, MultiParamTypeClasses,QuasiQuotes #-}
{-# LANGUAGE TemplateHaskell, TypeFamilies, TupleSections #-}
module Db.Facility where

import Control.Applicative ((<$>),(<*>))
import Control.Error (headMay)
import Control.Lens (_Wrapped,_Unwrapped,makeLenses,makeWrapped,(^.))
import Control.Monad.Reader (ReaderT)
import Data.Maybe (fromMaybe) 
import Data.Text (Text)
import Database.PostgreSQL.Simple (Connection)
import Database.PostgreSQL.Simple.FromRow (FromRow,fromRow,field)
import Database.PostgreSQL.Simple.ToField (ToField,toField)
import Database.PostgreSQL.Simple.FromField (FromField,Conversion,fromField)
import Database.PostgreSQL.Simple.SqlQQ (sql)

import Snap.Snaplet.PostgresqlSimple (query)

type Db = ReaderT Connection IO

-- Some lousy newtypes so we can clean up on the cassava side.
newtype CsvInt    = CsvInt Int deriving (Eq,Show)
makeWrapped ''CsvInt
newtype CsvDouble = CsvDouble Double deriving (Eq,Show)
makeWrapped ''CsvDouble

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

insertFacility :: Facility -> Db Int
insertFacility f = fromMaybe 0 . headMay <$> (query
  [sql|
   INSERT INTO park_facility (
     park_number,park_name,node_id,node_use,node_name,item_id,item_type,item_name,
     description,easting,northing,orig_fid,coords
   ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
   RETURNING id
  |]
  (
    f ^. parkNumber
    , f ^. parkName
    , f ^. nodeId
    , f ^. nodeUse
    , f ^. nodeName
    , f ^. itemId
    , f ^. itemType
    , f ^. itemName
    , f ^. description
    , f ^. easting
    , f ^. northing
    , f ^. origFid
    , coordText 
  ))
  where 
    coordText = show (f ^. coords)

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
    <*> ((,) <$> field <*> field)
