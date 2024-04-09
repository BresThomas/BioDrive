const express = require('express');
const {
  createCompteEnergie,
  getCompteEnergie,
  getComptesEnergie,
  updateCompteEnergie,
  updateCompteEnergieTransaction,
  deleteCompteEnergie,
} = require('../controllers/compteEnergieController.js');

const router = express.Router();

router.get('/comptesEnergie', getComptesEnergie);
router.post('/newCompteEnergie', createCompteEnergie);
router.get('/compteEnergie/:id', getCompteEnergie);
router.put('/updateCompteEnergie/:id', updateCompteEnergie);
router.put('/updateCompteEnergieTransaction/:id', updateCompteEnergieTransaction);
router.delete('/deleteCompteEnergie/:id', deleteCompteEnergie);

module.exports = router;
