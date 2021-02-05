// pg_ctl -D /usr/local/var/postgres start
// pg_ctl -D /usr/local/var/postgres stop

// createdb mydatabasename
// dropdb mydatabasename

// psql mydatabasename

// CREATE DATABASE mydatabasename;
// DROP DATABASE mydatabasename;

// \list - List all of your actual databases.
// \c mydatabasename - Connect to another database.
// \d - List the relations of your currently connected database.
// \d mytablename - Shows information for a specific table.

// In a production environment, configuration details will be put in a separate file with restrictive permissions that is not /// accessible from version control
// First import the Pool Class from the pg module
const { Pool } = require('pg');

const pgPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews',
  password: 'admin',
  port: 5432,
})
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
// This covers us in case of a network error.

// pool.on('error', (err, client) => {
//   console.error('Error:', err);
// });

// const query = `
// SELECT *
// FROM items
// `;




// to get the table from the command line run \dt



// CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id)


// try {
//   const res = await client.query(query);
//   console.log('Items Table is successfully created');
// } catch (err) {
//   console.log(err.stack);
// } finally {
//   client.close();
// }
// try {
//   const res = await client.query(query);
//   console.log('Table is successfully created');
// } catch (err) {
//   console.log(err.stack);
// } finally {
//   client.close();
// }

module.exports.pgPool = pgPool;