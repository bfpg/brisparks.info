govhack-brissy-parks
====================

The DB dump was generated with the following command:

    pg_dump brissy_parks --format plain --no-owner --data-only -f data/dataset.sql  


Setup
=====

1. Create database and apply schema:

    % export PGDATABASE=brissy_parks
    % createdb $PGDATABASE
    % psql < ./data/schema.sql

2. Import all data:

    % cabal run import-facilities

3. ???

4. Profit!


FreeBSD notes
-------------

postgis21 port/pkg is broken.  To get it working:

- compile postgresql from ports with libstdc++:

    % cd /usr/ports/databases/postgresql92-server
    % LDFLAGS=-lstdc++ make install

- compile postgis from ports with `RASTER` option enabled.
