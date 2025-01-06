const express = require('express');
const carRoutes = require('./routes/carRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

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
