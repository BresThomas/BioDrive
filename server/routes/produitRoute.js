import express from 'express';

import {
  createProduit,
  getProduit,
  getProduits,
  updateProduit,
  deleteProduit,
} from '../controllers/produitController.js';

const router = express.Router();

router.get('/produits', getProduits);
router.post('/newProduit', createProduit);
router.get('/Produit/:id', getProduit);
router.put('/updateProduit/:id', updateProduit);
router.delete('/deleteProduit/:id', deleteProduit);

export default router;
