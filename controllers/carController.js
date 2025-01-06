const { Pool } = require('pg');
const pool = new Pool();

exports.viewCars = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars');
    res.render('cars', { cars: result.rows });
  } catch (err) {
    res.status(500).send('Error fetching car inventory');
  }
};
