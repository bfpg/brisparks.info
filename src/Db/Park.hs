{-# LANGUAGE FlexibleInstances, MultiParamTypeClasses,OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes, TypeOperators #-}
{-# LANGUAGE TemplateHaskell, TypeFamilies, TupleSections #-}

module Db.Park where

import Control.Applicative ((<$>))
import Control.Error (headMay)
import Data.Aeson.TH (deriveJSON)
import Data.Text (Text)
import qualified Data.Text as T
import Database.PostgreSQL.Simple.SqlQQ (sql)
import Snap.Snaplet.PostgresqlSimple (Only(Only), query)

import Db.Internal
import Db.Facility
import Db.Feature

data Park = Park
  { _parkNumber     :: Int
  , _parkName       :: Text
  , _parkStreet     :: Text
  , _parkSuburb     :: Text
  , _parkLat        :: Double
  , _parkLong       :: Double
  , _parkKmlHref    :: Text
  , _parkFacilities :: [Facility]
  , _parkFeatures   :: [Feature]
  } deriving (Eq,Show)
deriveJSON (aesonThOptions (Just "_park")) ''Park

getPark :: Text -> Int -> Db (Maybe Park)
getPark baseUrl parkId = do
  tsMay <- q
  facilities <- getFacilities parkId
  features <- getFeatures parkId
  return $ fmap (mkPark facilities features) tsMay
  where
    q = headMay <$> query
      [sql|
        SELECT
          f.park_number
          , f.park_name
          , street
          , suburb
          , latitude
          , longtitude
        FROM
          park_facility f
          LEFT JOIN park_address a ON (f.park_number = a.park_number)
        WHERE
          f.park_number = ?
      |]
      (Only parkId)
    mkPark fs fs' (n,name,st,sub,lat,long)
      = Park n name st sub lat long kmlUrl fs fs'
    kmlUrl = T.concat [baseUrl,"/api/kml/",T.pack . show $ parkId]
