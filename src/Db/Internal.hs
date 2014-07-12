{-# LANGUAGE FlexibleInstances, MultiParamTypeClasses, TemplateHaskell,TypeFamilies #-}
module Db.Internal where

import Control.Lens (_Wrapped,_Unwrapped,(^.),makeWrapped)
import Data.Aeson (ToJSON,FromJSON,toJSON,parseJSON)
import Data.List (stripPrefix)
import Data.Aeson.TH (Options,defaultOptions,fieldLabelModifier)
import Data.Char (toLower)
import Data.Maybe (fromMaybe)
import Database.PostgreSQL.Simple.ToField (ToField,toField)
import Database.PostgreSQL.Simple.FromField (FromField,Conversion,fromField)
import Control.Monad.Reader (ReaderT)
import Snap.Snaplet.PostgresqlSimple (Postgres)

type Db = ReaderT Postgres IO

-- Some lousy newtypes so we can clean up on the cassava side.
newtype CsvInt    = CsvInt Int deriving (Eq,Show)
makeWrapped ''CsvInt
instance ToJSON CsvInt where
  toJSON = toJSON . (^. _Wrapped) 
instance FromJSON CsvInt where
  parseJSON = fmap CsvInt . parseJSON
  
newtype CsvDouble = CsvDouble Double deriving (Eq,Show)
makeWrapped ''CsvDouble
instance ToJSON CsvDouble where
  toJSON = toJSON . (^. _Wrapped) 
instance FromJSON CsvDouble where
  parseJSON = fmap CsvDouble . parseJSON

instance FromField CsvInt where
  fromField f bs = fmap (^. _Unwrapped) (fromField f bs :: Conversion Int)

instance ToField CsvInt where
  toField f = toField (f ^. _Wrapped :: Int)

instance FromField CsvDouble where
  fromField f bs = fmap (^. _Unwrapped) (fromField f bs :: Conversion Double)

instance ToField CsvDouble where
  toField f = toField (f ^. _Wrapped :: Double)

aesonThOptions :: (Maybe String) -> Options
aesonThOptions prefix = defaultOptions { fieldLabelModifier = fixName }
  where 
    fixName :: String ->  String
    fixName s = fromMaybe s $ do 
      p        <- prefix 
      stripped <- stripPrefix p s 
      return $ case stripped of
        []     -> []
        (a:as) -> toLower a : as
