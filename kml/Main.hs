{-# LANGUAGE OverloadedStrings #-}

import Control.Monad
import Control.Monad.Reader

import Control.Error (Script,runScript,scriptIO)
import Data.Configurator (subconfig)
import Data.Configurator.Types (Config)
import Data.Pool (createPool)
import Database.PostgreSQL.Simple (connectPostgreSQL,close)
import Snap.Snaplet (loadAppConfig)
import Snap.Snaplet.PostgresqlSimple (Postgres(..),getConnectionString)

import Db.Facility

{-

Convert all the geoms into kmls.

-}

main :: IO ()
main = runScript $ do
  pg   <- scriptIO $ conf >>= getPostgres
  parkIds <- scriptIO $ runReaderT queryParkIds pg
  parkFacilities <- scriptIO $ runReaderT (queryParkFacilities $ head parkIds) pg
  return ()

conf :: IO Config
conf = loadAppConfig "devel.cfg" "."

getPostgres :: Config -> IO Postgres
getPostgres c = do
  s <- getConnectionString . subconfig "postgresql-simple" $ c
  p <- createPool (connectPostgreSQL s) close 1 10 5
  return $ Postgres p
