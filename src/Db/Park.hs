{-# LANGUAGE FlexibleInstances, MultiParamTypeClasses,OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes, TypeOperators #-}
{-# LANGUAGE TemplateHaskell, TypeFamilies, TupleSections #-}
module Db.Park where

import Control.Applicative ((<$>),(<*>))
import Control.Error (headMay)
import Control.Lens (_Wrapped,_Unwrapped,_Show,makeLenses,makeWrapped,(^.))
import Control.Monad.Reader (ReaderT)
import Data.Aeson (ToJSON,FromJSON,toJSON,parseJSON)
import Data.Aeson.TH (deriveJSON)
import Data.Bifunctor (first)
import Data.Char (isDigit)
import Data.Foldable(fold)
import Data.List (nub)
import Data.List.Split (splitWhen)
import Data.Maybe (fromMaybe) 
import Data.Text (Text)
import qualified Data.Text as T
import Data.Traversable (sequenceA,traverse)
import Database.PostgreSQL.Simple (Connection,(:.)(..))
import Database.PostgreSQL.Simple.FromRow (FromRow,fromRow,field)
import Database.PostgreSQL.Simple.ToRow (ToRow,toRow)
import Database.PostgreSQL.Simple.ToField (ToField,toField)
import Database.PostgreSQL.Simple.FromField (FromField,Conversion,fromField)
import Database.PostgreSQL.Simple.SqlQQ (sql)
import Snap.Snaplet.PostgresqlSimple (Postgres,Only(Only),fromOnly,query,query_,execute_)

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
getPark baseUrl id = do
  tsMay <- q id
  facilities <- getFacilities id
  features <- getFeatures id
  return $ fmap (mkPark facilities features) tsMay
  where
    q :: Int -> Db (Maybe (Int,Text,Text,Text,Double,Double))
    q id = headMay <$> query
      [sql|
         SELECT f.park_number, f.park_name,street,suburb,latitude,longtitude
         FROM park_facility f LEFT JOIN park_address a ON (f.park_number = a.park_number)
         WHERE f.park_number = ?
         |]
      (Only id)
    mkPark fs fs' (n,name,st,sub,lat,long)
      = Park n name st sub lat long kmlUrl fs fs'
    kmlUrl = T.concat [baseUrl,"/api/kml/",T.pack . show $ id]
