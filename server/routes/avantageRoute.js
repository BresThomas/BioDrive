const express = require('express');
const {
  createAvantage,
  getAvantage,
  getAvantages,
  updateAvantage,
  deleteAvantage,
} = require('../controllers/avantageController.js');

const router = express.Router();

router.get('/avantages', getAvantages);
router.post('/newAvantage', createAvantage);
router.get('/avantage/:id', getAvantage);
router.put('/updateAvantage/:id', updateAvantage);
router.delete('/deleteAvantage/:id', deleteAvantage);

module.exports = router;
