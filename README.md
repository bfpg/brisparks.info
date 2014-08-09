Brisbane Park Finder
====================

Brisbane has over 2000 parks, with many useful facilities.  The goal
of Brisbane Park Finder is to make it easy for residents and
visitors in Brisbane to find parks in their area with the facilities
they want.  Users can search for parks by area, and by the kinds of
facilities available (e.g. barbeques, fitness equipment,
dog-off-leash areas, etc.)  They can see a map of the park including
the location of the various park facilities.


Attribution
-----------

To build Brisbane Park Finder, we've brought together the following
BCC data sets (all of which are CC-BY):

- Parks and Facilities Assets
  (http://data.brisbane.qld.gov.au/index.php/dataset/parks-facilities/)

- Brisbane Parks ESRI shape files, for park boundaries
  (http://data.gov.au/dataset/parks-brisbane-city-council)

- Surburbs and Adjoining Suburbs, for finding parks in or near a
  particular suburb
  (http://data.brisbane.qld.gov.au/index.php/dataset/suburbs-and-adjoining-suburbs/)

- Icons used on the map are from the CC0 (public domain) SJJB icon
  set
  (http://www.sjjb.co.uk/mapicons/download/SJJB-PNG-Icons-20111021.tar.gz).


Technology
----------

* PostgreSQL and PostGIS for geographically aware relational data
  storage.

* Backend written in the pure, lazy, strongly-typed functional
  programming language Haskell, using the Snap web framework.


Setup
=====

The DB dump was generated with the following command:

    pg_dump brissy_parks --format plain --no-owner --data-only -f data/dataset.sql

Create database and apply schema:

    % export PGDATABASE=brissy_parks
    % createdb $PGDATABASE
    % psql < ./data/schema.sql

Install dependencies and import all data:

    % cabal sandbox init
    % cabal install --only-dep
    % cabal run import

  Importing the data may take a few minutes, depending on
  the speed of your computer.  This process will also import KML
  data (the `shp2pgsql` command is required) and sets the SRID for
  the table to 4326.

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


Development
===========

Compiling coffeescript to javascript on the fly:

    % npm install grunt grunt-cli grunt-contrib-coffee \
      grunt-contrib-watch
    % node ./node_modules/grunt-cli/bin/grunt watch
