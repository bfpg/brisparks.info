{-# LANGUAGE OverloadedStrings, TupleSections #-}
module Main where

import Control.Error (runScript, scriptIO)
import Control.Concurrent.Async (Concurrently(..))
import Control.Monad
import Data.Configurator (subconfig)
import Data.Configurator.Types (Config)
import Data.Pool (createPool)
import Data.Traversable (traverse)
import Unsafe.Coerce

import qualified Data.ByteString as B
import System.Process

import Database.PostgreSQL.Simple (connectPostgreSQL,close)
import Snap.Snaplet (loadAppConfig)
import Snap.Snaplet.PostgresqlSimple (Postgres(..),getConnectionString)

import FacilitiesImport
import AdjoiningSuburbsImport
import ParkAddressesImport

main :: IO ()
main = runScript $ do
  (pg, conninfo) <- scriptIO $ conf >>= getPostgres
  void $ scriptIO $ runConcurrently $ traverse Concurrently
    [ importFacilities pg
    , importAdjoiningSuburbs pg
    , importParkAddresses pg
    , importFacilitiesWhitelists pg
    , importKml conninfo
    ]

conf :: IO Config
conf = loadAppConfig "devel.cfg" "."

getPostgres :: Config -> IO (Postgres, B.ByteString)
getPostgres c = do
  s <- getConnectionString $ subconfig "postgresql-simple" c
  p <- createPool (connectPostgreSQL s) close 1 10 5
  return (Postgres p, s)

importKml :: B.ByteString -> IO ()
importKml conninfo = void $
  psql "shp2pgsql data/parks_shape_files/OSM_PARK_LL.shp"
  >> psql "echo \"SELECT UpdateGeometrySRID('osm_park_ll', 'geom', 4326)\""
  where
    psql s = system (s ++ psqlCmd)
    psqlCmd = " | psql '" ++ unsafeCoerce (B.unpack conninfo) ++ "'"
