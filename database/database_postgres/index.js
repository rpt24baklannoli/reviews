// In a production environment, configuration details will be put in a separate file with restrictive permissions that is not /// accessible from version control
// to get the table from the command line run \dt

const { Pool } = require('pg');

const pgPool = new Pool({
  user: 'postgres',
  //host: 'localhost',
  host: '54.241.203.68',
  database: 'reviews',
  password: 'admin',
  port: 5432,
  max: 50,
});


module.exports.pgPool = pgPool;