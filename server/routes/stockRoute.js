import express from 'express';

import {
  createStock,
  getStock,
  getStocks,
  updateStock,
  deleteStock,
} from '../controllers/stockController.js';

const router = express.Router();

router.get('/stocks', getStocks);
router.post('/newStock', createStock);
router.get('/stock/:id', getStock);
router.put('/updateStock/:id', updateStock);
router.delete('/deleteStock/:id', deleteStock);

export default router;
