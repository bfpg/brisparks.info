module Internal where

import qualified Data.ByteString as BS
import qualified Data.ByteString.Char8 as BS8
import qualified Data.ByteString.Lazy as LBS
import Data.Char (isDigit)
import Data.Csv (FromField, parseField, FromNamedRecord, decodeByName)
import Data.Vector (toList)

import Db.Internal

instance FromField CsvInt where
  parseField = fmap CsvInt . parseField . BS8.filter isDigit

instance FromField CsvDouble where
  parseField = fmap CsvDouble . parseField . BS8.filter (/= ',')

loadCsv :: FromNamedRecord a => FilePath -> IO [a]
loadCsv fn = do
  -- Loading strict because the lazy bytestring caused an EOF bug in cassava
  -- TODO: Look at this tomorrow.
  c <- fmap LBS.fromStrict . BS.readFile $ fn
  case decodeByName c of
    Left err -> error $ "Csv Parse Failed: " ++ err
    Right c' -> return $ toList $ snd c'
