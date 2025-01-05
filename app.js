const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.GET('/', (req, res) => {
  res.send('Inventory App is running');
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
