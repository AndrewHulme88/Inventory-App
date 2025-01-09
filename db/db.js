const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASEURL || 'postgresql://andrew:mydb@localhost:5432/inventory_db', //need to update with my details
});

module.exports = pool;
