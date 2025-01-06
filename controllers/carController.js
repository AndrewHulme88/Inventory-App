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
  const { make, model, year } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO cars (make, model, year, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
      [make, model, year, 0]
    );
    res.redirect('/cars');
  } catch (err) {
    console.error('Error adding car:', err);
    res.status(500).json({ error: 'Failed to add car' });
  }
};


exports.deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM cars WHERE id = $1', [id]);
    res.redirect('/cars');
  } catch (err) {
    console.error('Error deleting car:', err);
    res.status(500).json({ error: 'Failed to delete car' });
  }
};
