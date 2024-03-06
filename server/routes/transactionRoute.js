import express from 'express';

import {
  createTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transactionController.js';

const router = express.Router();

router.get('/transactions', getTransactions);
router.post('/newTransaction', createTransaction);
router.get('/transaction/:id', getTransaction);
router.put('/updateTransaction/:id', updateTransaction);
router.delete('/deleteTransaction/:id', deleteTransaction);

export default router;
