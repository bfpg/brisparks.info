{-# LANGUAGE FlexibleInstances, MultiParamTypeClasses,OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE TypeFamilies, TupleSections #-}

module KML
  (
    queryParkNos
  , queryParkKML
  ) where

import Control.Applicative ((<$>))
import qualified Data.Text as T
import Database.PostgreSQL.Simple.SqlQQ (sql)
import Snap.Snaplet.PostgresqlSimple (Only(Only), fromOnly, query, query_)

import Db.Internal

queryParkNos :: Db [Integer]
queryParkNos = fmap fromOnly <$> query_
  [sql|
    SELECT DISTINCT CAST(park_numbe AS int)
    FROM osm_park_ll
  |]

queryParkKML :: Integer -> Db (Maybe T.Text)
queryParkKML parkNo = (makeKML . fmap fromOnly) <$> query
  [sql|
    SELECT ST_AsKML(geom)
    FROM osm_park_ll
    WHERE park_numbe = ?
  |]
  (Only parkNo)

makeKML :: [T.Text] -> Maybe T.Text
makeKML [] = Nothing
makeKML ss = Just $ T.concat [h, geoms, t]
  where
  h = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n\
      \<kml xmlns=\"http://www.opengis.net/kml/2.2\">\n\
      \   <Placemark>\n"
  t = "\n   </Placemark>\n</kml>"
  geoms = T.intercalate "\n" ss
