import express from 'express';

import {
  createAvantage,
  getAvantage,
  getAvantages,
  updateAvantage,
  deleteAvantage,
} from '../controllers/avantageController.js';

const router = express.Router();

router.get('/avantages', getAvantages);
router.post('/newAvantage', createAvantage);
router.get('/avantage/:id', getAvantage);
router.put('/updateAvantage/:id', updateAvantage);
router.delete('/deleteAvantage/:id', deleteAvantage);

export default router;
