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


FreeBSD notes
-------------

The `postgis21` the port is broken.  To get it working,
compile postgresql from ports with libstdc++:

    % cd /usr/ports/databases/postgresql92-server
    % LDFLAGS=-lstdc++ make install

`postgresql92-contrib` is also needed:

    % pkg install postgresql92-contrib

Compile `databases/postgis21` with the `RASTER` option enabled.
