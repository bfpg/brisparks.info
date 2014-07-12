module Internal where

import qualified Data.ByteString as BS
import qualified Data.ByteString.Lazy as LBS
import Data.Csv (FromNamedRecord,decodeByName)
import Data.Vector (toList)
                                                                      
loadCsv :: FromNamedRecord a => FilePath -> IO [a]
loadCsv fn = do
  -- Loading strict because the lazy bytestring caused an EOF bug in cassava
  -- TODO: Look at this tomorrow.
  c <- fmap LBS.fromStrict . BS.readFile $ fn
  case decodeByName c of
    Left err -> error $ "Csv Parse Failed: " ++ err
    Right c  -> return . toList . snd $ c
