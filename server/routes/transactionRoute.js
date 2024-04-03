const express = require('express');
const transactionController = require('../controllers/transactionController.js');

const router = express.Router();

router.get('/transactions', transactionController.getTransactions);
router.post('/newTransaction', transactionController.createTransaction);
router.get('/transaction/:id', transactionController.getTransaction);
router.put('/updateTransaction/:id', transactionController.updateTransaction);
router.delete('/deleteTransaction/:id', transactionController.deleteTransaction);

module.exports = router;
