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
import           Control.Monad.Reader (runReaderT)
import           Data.Aeson
import           Data.ByteString (ByteString)
import qualified Data.ByteString as BS
import qualified Data.ByteString.Char8 as B8
-- Aeson's "encode" to json generates lazy bytestrings
import qualified Data.Configurator as C
import Data.List.Split (splitOn)
import qualified Data.Text as T
import qualified Data.Text.Encoding as T
import           Safe
import           Snap
import           Snap.Extras.JSON (writeJSON)
import           Snap.Snaplet.Heist
import           Snap.Util.FileServe
import           Heist
import qualified Heist.Interpreted as I
import           Snap.Snaplet.PostgresqlSimple (pgsInit, getPostgresState)
------------------------------------------------------------------------------
import           Application

import Db.Facility
import Db.Internal
import Db.Park
import KML

handleApiSearchAc :: AppHandler ()
handleApiSearchAc = do
  t <- acceptableSearch <$> getQueryParam "q"
  res <- runDb $ maybe (return []) searchShortList t
  writeJSON res

parkResultSplice :: Monad m => ParkResult -> Splices (HeistT n m Template)
parkResultSplice p = do
  splice "parkNumber" (T.pack . show . _parkResultNumber)
  splice "parkLat"    (T.pack . show . _parkResultLat)
  splice "parkLong"   (T.pack . show . _parkResultLong)
  splice "parkName"   _parkResultName
  splice "parkStreet" _parkResultStreet
  splice "parkSuburb" _parkResultSuburb
  where
    splice a f = a ## I.textSplice $ f p

parkResultsSplice :: [ParkResult] -> I.Splice AppHandler
parkResultsSplice = I.mapSplices (I.runChildrenWith . parkResultSplice)

handleApiSearch :: AppHandler ()
handleApiSearch = do
  t <- acceptableSearch <$> getQueryParam "searchtext"
  f <- fmap (splitOn "," . B8.unpack) <$> getQueryParam "features"
  res <- runDb $ maybe (return []) (searchPark f) t
  renderWithSplices "_search_results" ("parkResults" ## parkResultsSplice res)

handleApiKml :: AppHandler ()
handleApiKml = do
  parkId <- (>>= (readMay . B8.unpack)) <$> getParam "id"
  case parkId of
    Nothing -> httpErrorJson 400 "Bad Request" "expected integer id"
    Just n -> runDb (queryParkKML n)
      >>= require ("no kml for id " ++ show n)
      >>= writeText

handleApiFeatures :: AppHandler ()
handleApiFeatures = do
  t <- acceptableSearch <$> getQueryParam "q"
  res <- runDb $ maybe (return []) (\ st -> parkFeatures st [] []) t
  writeJSON res

handleApiPark :: AppHandler ()
handleApiPark = do
  parkId <- (>>= (readMay . B8.unpack)) <$> getParam "id"
  bUrl   <- gets _baseUrl
  case parkId of
    Nothing -> httpErrorJson 400 "Bad Request" "expected integer id"
    Just n -> runDb (getPark bUrl n)
      >>= require ("No Park witn ID " ++ show n)
      >>= writeJSON

httpErrorJson :: Int -> BS.ByteString -> String -> AppHandler a
httpErrorJson status statusMsg msg = do
  modifyResponse $ setResponseStatus status statusMsg
  writeJSON (object ["errorMessage" .= msg])
  getResponse >>= finishWith

require :: String -> Maybe a -> AppHandler a
require _ x = case x of
  Nothing -> httpErrorJson 404 "Not Found" "no kml for given id"
  Just a -> return a

handleSearchResults :: AppHandler ()
handleSearchResults = render "_search_results"

runDb :: Db a -> AppHandler a
runDb d = with db getPostgresState >>= (liftIO . runReaderT d)

acceptableSearch :: Maybe ByteString -> Maybe T.Text
acceptableSearch = fmap T.decodeUtf8 . mfilter ((>= 3) . BS.length)

------------------------------------------------------------------------------
-- | The application's routes.
routes :: [(ByteString, Handler App App ())]
routes =
  [ ("/api/search_ac", handleApiSearchAc)
  , ("/search"       , handleApiSearch)
  , ("/api/features" , handleApiFeatures)
  , ("/api/park/:id" , handleApiPark)  
  , ("/api/kml/:id"  , handleApiKml)
  , ("/results"      , handleSearchResults)
  , (""              , serveDirectory "static")
  ]

------------------------------------------------------------------------------
-- | The application initializer.
app :: SnapletInit App App
app = makeSnaplet "app" "An snaplet example application." Nothing $ do
    h <- nestSnaplet "" heist $ heistInit "templates"
    d <- nestSnaplet "db" db pgsInit
    c <- getSnapletUserConfig
    url <- liftIO $ C.require c "baseUrl"
    addRoutes routes
    return $ App h d url
