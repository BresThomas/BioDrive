const express = require('express');

const {
  createPaiement,
  getPaiement,
  getPaiements,
  updatePaiement,
  deletePaiement,
} = require('../controllers/paiementController.js');

const router = express.Router();

router.get('/paiements', getPaiements);
router.post('/newPaiement', createPaiement);
router.get('/paiement/:id', getPaiement);
router.put('/updatePaiement/:id', updatePaiement);
router.delete('/deletePaiement/:id', deletePaiement);

module.exports = router;
