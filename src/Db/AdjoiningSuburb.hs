{-# LANGUAGE FlexibleInstances, MultiParamTypeClasses,OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE TemplateHaskell, TypeFamilies, TupleSections #-}
module Db.AdjoiningSuburb where

import Control.Applicative ((<$>),(<*>))
import Control.Error (headMay)
import Data.Maybe (fromMaybe) 
import Data.Text (Text)
import Database.PostgreSQL.Simple (Connection)
import Database.PostgreSQL.Simple.FromRow (FromRow,fromRow,field)
import Database.PostgreSQL.Simple.ToRow (ToRow,toRow)
import Database.PostgreSQL.Simple.ToField (ToField,toField)
import Database.PostgreSQL.Simple.FromField (FromField,Conversion,fromField)
import Database.PostgreSQL.Simple.SqlQQ (sql)
import Snap.Snaplet.PostgresqlSimple (Only(Only),fromOnly,query,execute_)

import Db.Internal  

deleteAdjoiningSuburbs :: Db ()
deleteAdjoiningSuburbs = execute_ "TRUNCATE adjoining_suburb" >> return ()

insertAdjoiningSuburb :: Text -> Text -> Db Int
insertAdjoiningSuburb a as = fromMaybe 0 . fmap fromOnly . headMay <$> query
  "INSERT INTO adjoining_suburb (suburb_adjoining_suburb) VALUES (?,?) RETURNING id"
  (a,as)

searchAdjoiningSuburbs :: Text -> Db [Text]
searchAdjoiningSuburbs s = (fmap fromOnly) <$>
  query "SELECT adjoining_suburb FROM adjoining_suburb WHERE suburb = ?" (Only s)
