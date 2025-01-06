const pool = require('../db/db');

exports.viewCars = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars');
    res.render('cars', { cars: result.rows });
  } catch (err) {
    console.log('Error fetching cars:', err);
    res.status(500).send('Error fetching cars');
  }
};

exports.addCar = async (req, res) => {
  const { make, model, year, colour, quantity } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO cars (make, model, year, colour, quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [make, model, year, colour, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding car:', err);
    res.status(500).json({ error: 'Failed to add car' });
  }
};
