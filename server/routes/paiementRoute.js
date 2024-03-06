import express from 'express';

import {
  createPaiement,
  getPaiement,
  getPaiements,
  updatePaiement,
  deletePaiement,
} from '../controllers/paiementController.js';

const router = express.Router();

router.get('/paiements', getPaiements);
router.post('/newPaiement', createPaiement);
router.get('/paiement/:id', getPaiement);
router.put('/updatePaiement/:id', updatePaiement);
router.delete('/deletePaiement/:id', deletePaiement);

export default router;
