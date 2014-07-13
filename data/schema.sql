DROP SCHEMA public CASCADE;
DROP SCHEMA tiger CASCADE;

CREATE SCHEMA public;   
  
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;
CREATE EXTENSION fuzzystrmatch;
CREATE EXTENSION postgis_tiger_geocoder;

DROP TABLE park_facility;
DROP TABLE park_address;  
DROP TABLE adjoining_suburb;   
  
CREATE TABLE public.park_facility (
  id            SERIAL NOT NULL PRIMARY KEY
  , park_number INTEGER
  , park_name   VARCHAR(255)
  , node_id     INTEGER
  , node_use    VARCHAR(100)
  , node_name   VARCHAR(255)
  , item_id     VARCHAR(50)
  , item_type   VARCHAR(50)
  , item_name   VARCHAR(100)
  , description VARCHAR(255)
  , easting     FLOAT(53)
  , northing    FLOAT(53)
  , orig_fid    INTEGER
  , coords      GEOGRAPHY(Point)
);

DROP TABLE node_use_whitelist;
CREATE TABLE public.node_use_whitelist (
  node_use    VARCHAR(100)
);

DROP TABLE item_type_whitelist;
CREATE TABLE public.item_type_whitelist (
  item_type   VARCHAR(50)
);

CREATE TABLE public.adjoining_suburb (
  id                 SERIAL NOT NULL PRIMARY KEY
  , suburb           VARCHAR(50)
  , adjoining_suburb VARCHAR(50) 
);  

CREATE TABLE public.park_address (
  park_number INTEGER
  , park_name VARCHAR(255)
  , street VARCHAR(255)
  , suburb VARCHAR(100)
  , easting FLOAT(53) 
  , northing FLOAT(53) 
  , latitude FLOAT(53)
  , longtitude FLOAT(53)
);
