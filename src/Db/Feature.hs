{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE TemplateHaskell #-}

module Db.Feature where

import Control.Applicative
import Data.Text (Text)

import Control.Lens (makeLenses)
import Data.Aeson.TH (deriveJSON)
import Database.PostgreSQL.Simple.FromRow (FromRow, fromRow, field)
import Database.PostgreSQL.Simple.SqlQQ (sql)

import Snap.Snaplet.PostgresqlSimple (Only(Only), query)

import Db.Internal

data Feature = Feature
  { _featureParkNumber  :: CsvInt
  , _featureId          :: Text
  , _featureCoords      :: (CsvDouble,CsvDouble)
  } deriving (Eq, Show)
makeLenses ''Feature
deriveJSON (aesonThOptions Nothing) ''Feature

instance FromRow Feature where
  fromRow = Feature
    <$> field
    <*> field
    <*> (parseCoords <$> field)


getFeatures :: Int -> Db [Feature]
getFeatures i = query
  [sql|
    SELECT park_number, feature_id, ST_AsText(coords)
    FROM park_feature
    WHERE park_number = ?
  |]
  (Only i)
