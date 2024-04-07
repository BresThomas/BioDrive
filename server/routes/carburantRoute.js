const express = require('express');
const carburantController = require('../controllers/carburantController.js');

const router = express.Router();

router.get('/carburants', carburantController.getCarburants);
router.post('/newCarburant', carburantController.createCarburant);
router.get('/carburant/:id', carburantController.getCarburant);
router.put('/updateCarburant/:id', carburantController.updateCarburant);
router.delete('/deleteCarburant/:id', carburantController.deleteCarburant);

module.exports = router;
