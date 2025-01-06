const express = require('express');
const carRoutes = require('./routes/carRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASEURL || 'postgresql://user:password@localhost:5432/inventory_db', //need to update with my details
});

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cars', carRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Car Inventory App!');
});

app.get('/cars', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars');
    res.json(result.rows);
  } catch (err) {
    console.err('Error fetching cars:', err);
    res.status(500).json({ error: 'Failed to fetch cars'});
  }
});

app.post('/cars', async (req, res) => {
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
});

app.put('/cars/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const result = await pool.query(
      'UPDATE cars SET quantity = $1 WHERE id = $2 RETURNING *',
      [quantity, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating car:', err);
    res.status(500).json({ error: 'Failed to update car' });
  }
});

app.delete('/cars/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM cars WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting car:', err);
    res.status(500).json({ error: 'Failed to delete car' });
  }
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
