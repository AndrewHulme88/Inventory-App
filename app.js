const express = require('express');
const carRoutes = require('./routes/carRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cars', carRoutes);

app.use(express.static('public'));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`); // Logs every request
  next();
});

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
