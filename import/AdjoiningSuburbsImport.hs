{-# LANGUAGE OverloadedStrings, TupleSections #-}

module AdjoiningSuburbsImport where

import Control.Applicative ((<$>),(<*>))
import Control.Monad (void)
import Control.Monad.Reader (runReaderT)
import Data.Csv (FromNamedRecord, parseNamedRecord, (.:))
import Data.Text (Text)
import Snap.Snaplet.PostgresqlSimple (Postgres)

import Db.Internal
import Db.AdjoiningSuburb
import Internal

data AdjoiningSuburb = AdjoiningSuburb Text Text deriving Show

instance FromNamedRecord AdjoiningSuburb where
  parseNamedRecord m = AdjoiningSuburb
    <$> m .: "Suburb"
    <*> m .: "Adjoining Suburb"

importAdjoiningSuburbs :: Postgres -> IO ()
importAdjoiningSuburbs pg = do
  runReaderT deleteAdjoiningSuburbs pg
  c <- loadCsv "data/SUBURBS_AND_ADJOINING_SUBURBS.csv"
  void $ runReaderT (mapM_ insert c) pg

insert :: AdjoiningSuburb -> Db ()
insert (AdjoiningSuburb a as) = void $ insertAdjoiningSuburb a as
