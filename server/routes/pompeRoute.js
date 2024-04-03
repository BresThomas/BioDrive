const express = require('express');
const {
  createPompe,
  getPompe,
  getPompes,
  updatePompe,
  deletePompe,
} = require('../controllers/pompeController.js');

const router = express.Router();

router.get('/pompes', getPompes);
router.post('/newPompe', createPompe);
router.get('/pompe/:id', getPompe);
router.put('/updatePompe/:id', updatePompe);
router.delete('/deletePompe/:id', deletePompe);

module.exports = router;
