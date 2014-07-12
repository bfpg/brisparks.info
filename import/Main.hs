{-# LANGUAGE OverloadedLists, OverloadedStrings, TupleSections #-}
module Main where

import Control.Error (Script,runScript,scriptIO)
import Data.Configurator (subconfig)
import Data.Configurator.Types (Config)
import Data.Pool (createPool)
import Database.PostgreSQL.Simple (connectPostgreSQL,close)
import Snap.Snaplet (loadAppConfig)
import Snap.Snaplet.PostgresqlSimple (Postgres(..),getConnectionString)

import FacilitiesImport
import AdjoiningSuburbsImport

main :: IO ()
main = runScript $ do
  pg   <- scriptIO $ conf >>= getPostgres 
  importFacilities pg

conf :: IO Config
conf = loadAppConfig "devel.cfg" "."

getPostgres :: Config -> IO Postgres
getPostgres conf = do
  s <- getConnectionString . subconfig "postgresql-simple" $ conf
  p <- createPool (connectPostgreSQL s) close 1 10 5
  return $ Postgres p
