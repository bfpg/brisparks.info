{-# LANGUAGE FlexibleInstances, MultiParamTypeClasses,OverloadedStrings #-}

module Db.AdjoiningSuburb where

import Control.Applicative ((<$>))
import Control.Error (headMay)
import Control.Monad (void)
import Data.Text (Text)
import Snap.Snaplet.PostgresqlSimple (Only(Only),fromOnly,query,execute_)

import Db.Internal

deleteAdjoiningSuburbs :: Db ()
deleteAdjoiningSuburbs = void $ execute_ "TRUNCATE adjoining_suburb"

insertAdjoiningSuburb :: Text -> Text -> Db Int
insertAdjoiningSuburb a as = maybe 0 fromOnly . headMay <$> query
  "INSERT INTO adjoining_suburb (suburb,adjoining_suburb) VALUES (?,?) RETURNING id"
  (a,as)

searchAdjoiningSuburbs :: Text -> Db [Text]
searchAdjoiningSuburbs s = fmap fromOnly <$>
  query "SELECT adjoining_suburb FROM adjoining_suburb WHERE suburb = ?" (Only s)
