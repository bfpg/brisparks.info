{-# LANGUAGE OverloadedStrings, TupleSections #-}

module FacilitiesImport where

import Control.Applicative ((<$>),(<*>))
import Control.Concurrent.Async (mapConcurrently)
import Control.Error (Script,left,runScript,scriptIO)
import Control.Monad.IO.Class (liftIO)
import Control.Monad.Reader (runReaderT)
import qualified Data.ByteString as BS
import qualified Data.ByteString.Char8 as BS8
import qualified Data.ByteString.Lazy as LBS
import Data.Csv (FromNamedRecord,ToNamedRecord,FromField,decodeByName,parseField
  ,encodeByName,namedRecord,parseNamedRecord,toNamedRecord,(.=),(.:))
import Data.Configurator (subconfig)
import Data.Pool (createPool)
import Data.Vector (toList)
import Data.Traversable (traverse)
import Database.PostgreSQL.Simple (connectPostgreSQL,close,SqlError)
import Snap.Snaplet (loadAppConfig)
import Snap.Snaplet.PostgresqlSimple (Postgres(..),getConnectionString)

import Db.Facility

instance FromField CsvInt where
  parseField = fmap CsvInt . parseField . BS8.filter (/= ',')

instance FromField CsvDouble where
  parseField = fmap CsvDouble . parseField . BS8.filter (/= ',')

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

importFacilities :: Postgres -> Script ()
importFacilities pg = scriptIO $ do
  mapConcurrently (loadAndInsert pg) [1,2]
  return ()
  
loadAndInsert :: Postgres -> Int -> IO ()
loadAndInsert conn i = do
  c <- loadCsv (filePath i)
  runReaderT (mapM_ insertFacility c) $ conn
  
filePath :: Int -> FilePath
filePath i = "data/dataset_park_facilties_part_" ++ show i ++ ".csv"
  
loadCsv :: FilePath -> IO [Facility]
loadCsv fn = do
  -- Loading strict because the lazy bytestring caused an EOF bug in cassava
  -- TODO: Look at this tomorrow.
  c <- fmap LBS.fromStrict . BS.readFile $ fn
  case decodeByName c of
    Left err -> error $ "Csv Parse Failed: " ++ err
    Right c  -> return . toList . snd $ c
