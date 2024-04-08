const express = require('express');

const {
    createCarteEnergie,
    getCarteEnergie,
    getCarteEnergies,
    updateCarteEnergie,
    deleteCarteEnergie,
  } = require('../controllers/carteEnergieController.js');

const router = express.Router();

router.get('/carteEnergie', getCarteEnergies);
router.post('/newCarteEnergie', createCarteEnergie);
router.get('/carteEnergie/:id', getCarteEnergie);
router.put('/updateCarteEnergie/:id', updateCarteEnergie);
router.delete('/deleteCarteEnergie/:id', deleteCarteEnergie);

module.exports = router;
