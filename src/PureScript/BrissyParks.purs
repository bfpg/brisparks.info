module BrissyParks where

import Prelude

import Data.Either
import Data.Foreign

import Control.Monad.Eff

import qualified Debug.Trace as T
import qualified Control.Monad.JQuery as J

searchButton :: forall eff. Eff (dom :: J.DOM | eff) J.JQuery
searchButton = J.select "#searchButton"

searchTextInput :: forall eff. Eff (dom :: J.DOM | eff) J.JQuery
searchTextInput = J.select "#searchInput"
                  
main = J.ready $ do
  btn <- searchButton

  flip (J.onWithPreventDefault "click") btn $ \_ -> do
    input <- searchTextInput
    Right query <- parseForeign read <$> J.getValue input
    T.trace $ "Input query was :" ++ query
    searchTextInput >>= J.setValue ""
