{-# LANGUAGE OverloadedStrings, TupleSections #-}

module ParkAddressesImport where

import Control.Applicative ((<$>),(<*>))
import Control.Monad.Reader (runReaderT, void)
import Data.Csv (FromNamedRecord, parseNamedRecord,(.:))
import Snap.Snaplet.PostgresqlSimple (Postgres)

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
  void $ runReaderT (mapM_ insertParkAddress c) pg
