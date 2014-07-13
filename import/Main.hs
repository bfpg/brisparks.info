{-# LANGUAGE OverloadedStrings, TupleSections #-}
module Main where

import Control.Error (Script,runScript,scriptIO)
import Control.Concurrent.Async (Concurrently(..))
import Data.Configurator (subconfig)
import Data.Configurator.Types (Config)
import Data.Pool (createPool)
import Data.Traversable (traverse)
import Database.PostgreSQL.Simple (connectPostgreSQL,close)
import Snap.Snaplet (loadAppConfig)
import Snap.Snaplet.PostgresqlSimple (Postgres(..),getConnectionString)

import FacilitiesImport
import AdjoiningSuburbsImport
import ParkAddressesImport

main :: IO ()
main = runScript $ do
  pg   <- scriptIO $ conf >>= getPostgres 
  _ <- scriptIO . runConcurrently . traverse Concurrently $
    [ importFacilities pg
    , importAdjoiningSuburbs pg
    , importParkAddresses pg
    , importFacilitiesWhitelists pg
    ]
  return ()

conf :: IO Config
conf = loadAppConfig "devel.cfg" "."

getPostgres :: Config -> IO Postgres
getPostgres conf = do
  s <- getConnectionString . subconfig "postgresql-simple" $ conf
  p <- createPool (connectPostgreSQL s) close 1 10 5
  return $ Postgres p
