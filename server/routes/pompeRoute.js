import express from 'express';

import {
  createPompe,
  getPompe,
  getPompes,
  updatePompe,
  deletePompe,
} from '../controllers/pompeController.js';

const router = express.Router();

router.get('/pompes', getPompes);
router.post('/newPompe', createPompe);
router.get('/pompe/:id', getPompe);
router.put('/updatePompe/:id', updatePompe);
router.delete('/deletePompe/:id', deletePompe);

export default router;
