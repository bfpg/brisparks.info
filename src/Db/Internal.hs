{-# LANGUAGE GeneralizedNewtypeDeriving , OverloadedStrings #-}

import Snap.Snaplet.PostgresqlSimple 
  ( Postgres(..)
  , HasPostgres
  , FromRow
  , fromRow
  , getPostgresState
  , getConnectionString
  )

newtype DbCache a = DbCache 
  { unDbCache :: ReaderT DbCacheEnv IO a 
  } deriving (Applicative,Functor,Monad,MonadReader DbCacheEnv,MonadIO)
