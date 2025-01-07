const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/', carController.viewCars);
router.post('/add', carController.addCar);
router.post('/delete/:id', carController.deleteCar);
router.get('/edit/:id', carController.editCar);
router.post('/edit/:id', carController.updateCar);
router.get('/add', (req, res) => {
  res.render('addCar');
});

module.exports = router;
