import express from 'express';

import {
  createTache,
  getTache,
  getTaches,
  updateTache,
  deleteTache,
} from '../controllers/tacheController.js';

const router = express.Router();

router.get('/taches', getTaches);
router.post('/newTache', createTache);
router.get('/tache/:id', getTache);
router.put('/updateTache/:id', updateTache);
router.delete('/deleteTache/:id', deleteTache);

export default router;
