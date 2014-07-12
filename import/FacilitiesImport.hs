{-# LANGUAGE OverloadedStrings, TupleSections #-}

module FacilitiesImport where

import Control.Applicative ((<$>),(<*>))
import Control.Concurrent.Async (mapConcurrently)
import Control.Error (Script,left,runScript,scriptIO)
import Control.Monad.Reader (runReaderT)
import qualified Data.ByteString.Char8 as BS8
import Data.Char
import Data.Csv (FromNamedRecord,ToNamedRecord,FromField,decodeByName,parseField
  ,encodeByName,namedRecord,parseNamedRecord,toNamedRecord,(.=),(.:))
import Database.PostgreSQL.Simple (connectPostgreSQL,close,SqlError)
import Snap.Snaplet (loadAppConfig)
import Snap.Snaplet.PostgresqlSimple (Postgres)

import Db.Internal
import Db.Facility
import Internal

instance FromNamedRecord Facility where
  parseNamedRecord m = Facility
    <$> m .: "PR_NO"
    <*> m .: "PARK_NAME"
    <*> m .: "NODE_ID"
    <*> m .: "NODE_USE"
    <*> m .: "NODES_NAME"
    <*> m .: "ITEM_ID"
    <*> m .: "ITEM_TYPE"
    <*> m .: "ITEMS_NAME"
    <*> m .: "DESCRIPTION"
    <*> m .: "EASTING"
    <*> m .: "NORTHING"
    <*> m .: "ORIG_FID"
    <*> ((,) <$> m .: "LONGITUDE" <*> m .: "LATITUDE")

importFacilities :: Postgres -> IO ()
importFacilities pg = do
  runReaderT deleteFacilities pg 
  mapConcurrently (loadAndInsert pg) [1,2]
  return ()
  
loadAndInsert :: Postgres -> Int -> IO ()
loadAndInsert conn i = do
  c <- loadCsv (filePath i)
  runReaderT (mapM_ insertFacility c) $ conn
  
filePath :: Int -> FilePath
filePath i = "data/dataset_park_facilties_part_" ++ show i ++ ".csv"
