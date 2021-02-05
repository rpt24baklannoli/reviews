// pg_ctl -D /usr/local/var/postgres start
// pg_ctl -D /usr/local/var/postgres stop

// createdb mydatabasename
// dropdb mydatabasename

// psql mydatabasename


// \list - List all of your actual databases.
// \c mydatabasename - Connect to another database.
// \d - List the relations of your currently connected database.
// \d mytablename - Shows information for a specific table.

// In a production environment, configuration details will be put in a separate file with restrictive permissions that is not /// accessible from version control
// to get the table from the command line run \dt

const { Pool } = require('pg');

const pgPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews',
  password: 'admin',
  port: 5432,
}


module.exports.pgPool = pgPool;