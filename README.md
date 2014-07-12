govhack-brissy-parks
====================

The DB dump was generated with the following command:

    pg_dump brissy_parks --format plain --no-owner --data-only -f data/dataset.sql  


Setup
=====

Create database and apply schema:

    % export PGDATABASE=brissy_parks
    % createdb $PGDATABASE
    % psql < ./data/schema.sql

Install dependencies and import all data:

    % cabal sandbox init
    % cabal install --only-dep
    % cabal run import

  Importing the data may take a few minutes, depending on
  the speed of your computer.

Install Javascript dependencies:

    % npm install


FreeBSD notes
-------------

The `postgis21` the port is broken.  To get it working,
compile postgresql from ports with libstdc++:

    % cd /usr/ports/databases/postgresql92-server
    % LDFLAGS=-lstdc++ make install

`postgresql92-contrib` is also needed:

    % pkg install postgresql92-contrib

Compile `databases/postgis21` with the `RASTER` option enabled.


Converting SHP to KML
=====================

Use `shp2pgsql` to add a table of the geometries to the database:

    % shp2pgsql data/parks_shape_files/OSM_PARK_LL.shp | psql

An SRID is needed to convert the PostGIS geometry to a KML
representation.  The SRID is (hopefully) WGS84 (ref. 4326):

    psql# SELECT UpdateGeometrySRID('osm_park_ll', 'geom', 4326);

Select some KML to confirm that it is working:

    psql# SELECT ST_AsKML(geom) from osm_park_ll limit 1;


Development
===========

Compiling coffeescript to javascript on the fly:

    % npm install grunt grunt-cli grunt-contrib-coffee \
      grunt-contrib-watch
    % node ./node_modules/grunt-cli/bin/grunt watch
