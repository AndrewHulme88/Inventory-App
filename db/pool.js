const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATAPASE_URL,
});

pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Console connection error', err));
