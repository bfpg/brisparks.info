{-# LANGUAGE OverloadedStrings, TupleSections #-}

module ParkAddressesImport where

import Control.Applicative ((<$>),(<*>))
import Control.Error (Script,left,runScript,scriptIO)
import Control.Monad.Reader (runReaderT)
import Data.Csv (FromNamedRecord,ToNamedRecord,FromField,decodeByName,parseField
  ,encodeByName,namedRecord,parseNamedRecord,toNamedRecord,(.=),(.:))
import Data.Text (Text)
import Snap.Snaplet.PostgresqlSimple (Postgres)

import Db.Internal
import Db.ParkAddress
import Internal

instance FromNamedRecord ParkAddress where
  parseNamedRecord m = ParkAddress 
    <$> m .: "Park Code"
    <*> m .: "Name"
    <*> m .: "Street"
    <*> m .: "Suburb"
    <*> m .: "Easting"
    <*> m .: "Northing"
    <*> m .: "Latitude"
    <*> m .: "Longitude"

importParkAddresses :: Postgres -> IO ()
importParkAddresses pg = do
  runReaderT deleteParkAddresses pg 
  c <- loadCsv "data/parks_with_suburb_info.csv"
  runReaderT (mapM_ insertParkAddress c) $ pg
  return ()
