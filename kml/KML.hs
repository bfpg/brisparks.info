{-# LANGUAGE FlexibleInstances, MultiParamTypeClasses,OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE TypeFamilies, TupleSections #-}

module KML where

import Control.Applicative ((<$>),(<*>))
import Control.Error (headMay)
import Control.Lens (_Wrapped,_Unwrapped,_Show,makeLenses,makeWrapped,(^.))
import Control.Monad.Reader (ReaderT)
import Data.Maybe (fromMaybe)
import qualified Data.Text as T
import Database.PostgreSQL.Simple (Connection)
import Database.PostgreSQL.Simple.FromRow (FromRow,fromRow,field)
import Database.PostgreSQL.Simple.ToRow (ToRow,toRow)
import Database.PostgreSQL.Simple.ToField (ToField,toField)
import Database.PostgreSQL.Simple.FromField (FromField,Conversion,fromField)
import Database.PostgreSQL.Simple.SqlQQ (sql)
import Snap.Snaplet.PostgresqlSimple (Postgres,Only(Only),fromOnly,query,query_,execute_)

import Db.Internal

tableName :: T.Text
tableName = "osm_park_ll"

queryParkNos :: Db [Integer]
queryParkNos = fmap fromOnly <$> query_
  [sql|
    SELECT DISTINCT CAST(park_numbe AS int)
    FROM osm_park_ll
  |]

queryParkKML :: Integer -> Db [T.Text]
queryParkKML parkNo = fmap fromOnly <$> query
  [sql|
    SELECT ST_AsKML(geom)
    FROM osm_park_ll
    WHERE park_numbe = ?
  |]
  (Only parkNo)

makeKML :: [T.Text] -> T.Text
makeKML ss = h `T.append` geoms `T.append` t
  where
  h = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n\
      \<kml xmlns=\"http://www.opengis.net/kml/2.2\">\n\
      \   <Placemark>\n"
  t = "\n   </Placemark>\n</kml>"
  geoms = T.intercalate "\n" ss
