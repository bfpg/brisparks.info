CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;
CREATE EXTENSION fuzzystrmatch;
CREATE EXTENSION postgis_tiger_geocoder;

DROP TABLE park_facility;
   
CREATE TABLE park_facility (
  id            SERIAL NOT NULL PRIMARY KEY
  , park_number VARCHAR(20)
  , park_name   VARCHAR(20)
  , node_id     INTEGER
  , node_use    VARCHAR(100)
  , node_name   VARCHAR(100)
  , item_id     VARCHAR(20)
  , item_type   VARCHAR(20)
  , item_name   VARCHAR(20)
  , description VARCHAR(255) 
  , easting     NUMERIC(19,10)
  , northing    NUMERIC(19,10)
  , orig_fid    INTEGER
  , coords      GEOGRAPHY(Point)
);

CREATE TABLE adjoining_suburb (
  id                 SERIAL NOT NULL PRIMARY KEY
  , suburb           VARCHAR(50)
  , adjoining_suburb VARCHAR(50) 
);  
