import express from 'express';

import {
  createCompteEnergie,
  getCompteEnergie,
  getComptesEnergie,
  updateCompteEnergie,
  deleteCompteEnergie,
} from '../controllers/compteEnergieController.js';

const router = express.Router();

router.get('/comptesEnergie', getComptesEnergie);
router.post('/newCompteEnergie', createCompteEnergie);
router.get('/compteEnergie/:id', getCompteEnergie);
router.put('/updateCompteEnergie/:id', updateCompteEnergie);
router.delete('/deleteCompteEnergie/:id', deleteCompteEnergie);

export default router;
