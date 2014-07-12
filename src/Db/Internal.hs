module Db.Internal where

import Control.Monad.Reader (ReaderT)
import Snap.Snaplet.PostgresqlSimple (Postgres)

type Db = ReaderT Postgres IO
