const express = require('express');
const {
  createReappro,
  getReappro,
  getReappros,
  updateReappro,
  deleteReappro,
} = require('../controllers/reapproController.js');

const router = express.Router();

router.get('/reappros', getReappros);
router.post('/newReappro', createReappro);
router.get('/reappro/:id', getReappro);
router.put('/updateReappro/:id', updateReappro);
router.delete('/deleteReappro/:id', deleteReappro);

module.exports = router;
