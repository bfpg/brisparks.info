{-# LANGUAGE OverloadedStrings #-}

------------------------------------------------------------------------------
-- | This module is where all the routes and handlers are defined for your
-- site. The 'app' function is the initializer that combines everything
-- together and is exported by this module.
module Site
  ( app
  ) where

------------------------------------------------------------------------------
import           Control.Applicative
import           Control.Monad (mfilter)
import           Control.Monad.Reader (runReaderT)
import           Data.ByteString (ByteString)
import qualified Data.ByteString as BS
import           Data.Maybe (maybe)
import qualified Data.Text as T
import qualified Data.Text.Encoding as T
import           Snap  
import           Snap.Extras.JSON (writeJSON)
import           Snap.Snaplet.Heist
import           Snap.Util.FileServe
import           Heist
import qualified Heist.Interpreted as I
import           Snap.Snaplet.PostgresqlSimple (Postgres,pgsInit,getPostgresState)        
------------------------------------------------------------------------------
import           Application

import Db.Facility
import Db.Internal

handleApiSearchAc :: AppHandler ()
handleApiSearchAc = do
  t <- getQueryParam "q"
  res <- runDb $ maybe (return []) (searchFacilityTerms . T.decodeUtf8) t
  writeJSON res

handleApiSearch :: AppHandler ()
handleApiSearch = do             
  t <- acceptableSearch <$> getQueryParam "q"
  res <- runDb $ maybe (return []) (searchFacility . T.decodeUtf8) t
  writeJSON res

runDb :: Db a -> AppHandler a
runDb d = with db getPostgresState >>= (liftIO . runReaderT d)

acceptableSearch :: Maybe ByteString -> Maybe ByteString
acceptableSearch = mfilter ((>= 3) . BS.length)

------------------------------------------------------------------------------
-- | The application's routes.
routes :: [(ByteString, Handler App App ())]
routes =
  [ ("/api/search_ac", handleApiSearchAc)  
  , ("/api/search"   , handleApiSearch)  
  , (""              , serveDirectory "static")
  ]

------------------------------------------------------------------------------
-- | The application initializer.
app :: SnapletInit App App
app = makeSnaplet "app" "An snaplet example application." Nothing $ do
    h <- nestSnaplet "" heist $ heistInit "templates"
    d <- nestSnaplet "db" db pgsInit
    addRoutes routes
    return $ App h d

