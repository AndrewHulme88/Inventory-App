const express = require('express');
const carRoutes = require('./routes/carRoutes');
require('dotenv').config();
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASEURL || 'postgresql://andrew:ParkwayDrive@localhost:5432/inventory_db', //need to update with my details
});

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cars', carRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Car Inventory App!');
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = pool;
