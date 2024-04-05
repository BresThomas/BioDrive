const express = require('express');
const router = express.Router();

const {
  createTableTransactions,
  getTableTransactions,
  getTableTransaction,
  updateTableTransaction,
  deleteTableTransaction,
} = require('../controllers/tableTransactionsController.js');

router.get('/table_transactions', getTableTransactions);
router.post('/newTableTransaction', createTableTransactions);
router.get('/table_transaction/:id', getTableTransaction);
router.put('/updateTableTransaction/:id', updateTableTransaction);
router.delete('/deleteTableTransaction/:id', deleteTableTransaction);

module.exports = router;
