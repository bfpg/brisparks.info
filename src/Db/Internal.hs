module Db.Internal where

import Data.List (stripPrefix)
import Data.Aeson.TH (Options,defaultOptions,fieldLabelModifier)
import Data.Char (toLower)
import Data.Maybe (fromMaybe)
import Control.Monad.Reader (ReaderT)
import Snap.Snaplet.PostgresqlSimple (Postgres)

type Db = ReaderT Postgres IO

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
