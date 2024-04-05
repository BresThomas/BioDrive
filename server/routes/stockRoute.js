const express = require('express');
const {
  createStock,
  getStock,
  getStocks,
  updateStock,
  deleteStock,
} = require('../controllers/stockController.js');

const router = express.Router();

router.get('/stocks', getStocks);
router.post('/newStock', createStock);
router.get('/stock/:id', getStock);
router.put('/updateStock/:id', updateStock);
router.delete('/deleteStock/:id', deleteStock);

module.exports = router;
