const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/', carController.viewCars);
router.post('/', carController.addCar);

module.exports = router;
