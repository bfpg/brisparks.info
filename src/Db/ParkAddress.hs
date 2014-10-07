{-# LANGUAGE FlexibleInstances, MultiParamTypeClasses,OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE TemplateHaskell, TypeFamilies, TupleSections #-}
module Db.ParkAddress where

import Control.Applicative ((<$>),(<*>))
import Control.Monad (void)
import Control.Lens ((^.),makeLenses)
import Data.Text (Text)
import Database.PostgreSQL.Simple.FromRow (FromRow,fromRow,field)
import Database.PostgreSQL.Simple.ToRow (ToRow,toRow)
import Database.PostgreSQL.Simple.ToField (toField)
import Database.PostgreSQL.Simple.SqlQQ (sql)
import Snap.Snaplet.PostgresqlSimple (execute, execute_)

import Db.Internal

data ParkAddress = ParkAddress
  { _parkNumber        :: CsvInt
  , _parkName          :: Text 
  , _parkStreet        :: Text
  , _parkSuburb        :: Text
  , _parkAddyEasting   :: CsvDouble
  , _parkAddyNorthing  :: CsvDouble
  , _parkAddyLatitude  :: CsvDouble
  , _parkAddyLongtitude :: CsvDouble
  } deriving (Eq,Show)
makeLenses ''ParkAddress

deleteParkAddresses :: Db ()
deleteParkAddresses = void $ execute_ "TRUNCATE park_address"

insertParkAddress :: ParkAddress -> Db ()
insertParkAddress a = const () <$> execute
  [sql|INSERT INTO park_address (
    park_number,park_name,street,suburb,easting,northing,latitude,longtitude
  ) VALUES (?,?,?,?,?,?,?,?)|]
  a 

instance FromRow ParkAddress where
  fromRow = ParkAddress
    <$> field
    <*> field 
    <*> field 
    <*> field 
    <*> field 
    <*> field 
    <*> field 
    <*> field 
  
instance ToRow ParkAddress where
  toRow f =
    [ toField (f ^. parkNumber)
    , toField (f ^. parkName)
    , toField (f ^. parkStreet)
    , toField (f ^. parkSuburb)
    , toField (f ^. parkAddyEasting)
    , toField (f ^. parkAddyNorthing)
    , toField (f ^. parkAddyLatitude)
    , toField (f ^. parkAddyLongtitude)
    ]
