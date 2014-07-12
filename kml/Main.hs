{-# LANGUAGE OverloadedStrings #-}

import Control.Monad
import Control.Monad.Reader

import Control.Error (Script,runScript,scriptIO)
import Data.Configurator (subconfig)
import Data.Configurator.Types (Config)
import qualified Data.Text.IO as T
import Data.Pool (createPool)
import Database.PostgreSQL.Simple (connectPostgreSQL,close)
import Snap.Snaplet (loadAppConfig)
import Snap.Snaplet.PostgresqlSimple (Postgres(..),getConnectionString)

import KML

{-

Convert all the geoms into kmls.

-}

main :: IO ()
main = runScript $ do
  pg   <- scriptIO $ conf >>= getPostgres
  parkNos <- scriptIO $ runReaderT queryParkNos pg
  kml <- scriptIO $ runReaderT (queryParkKML $ head parkNos) pg
  _ <- scriptIO $ T.putStrLn (makeKML kml)
  return ()

conf :: IO Config
conf = loadAppConfig "devel.cfg" "."

getPostgres :: Config -> IO Postgres
getPostgres c = do
  s <- getConnectionString . subconfig "postgresql-simple" $ c
  p <- createPool (connectPostgreSQL s) close 1 10 5
  return $ Postgres p
