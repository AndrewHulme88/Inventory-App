const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/', carController.viewCars);
router.post('/add', carController.addCar);
router.post('/delete/:id', carController.deleteCar);

module.exports = router;
