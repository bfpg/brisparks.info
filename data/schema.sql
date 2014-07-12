
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;
CREATE EXTENSION fuzzystrmatch;
CREATE EXTENSION postgis_tiger_geocoder;

DROP TABLE park_facility;
DROP TABLE park_facility_term;
DROP TABLE adjoining_suburb;   
  
CREATE TABLE park_facility (
  id            SERIAL NOT NULL PRIMARY KEY
  , park_number VARCHAR(20)
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

CREATE TABLE park_facility_term (
  term VARCHAR(255) PRIMARY KEY
  , type VARCHAR(25)
);

CREATE TABLE adjoining_suburb (
  id                 SERIAL NOT NULL PRIMARY KEY
  , suburb           VARCHAR(50)
  , adjoining_suburb VARCHAR(50) 
);  
