const express = require('express');
const {
  createTache,
  getTache,
  getTaches,
  updateTache,
  deleteTache,
} = require('../controllers/tacheController.js');

const router = express.Router();

router.get('/taches', getTaches);
router.post('/newTache', createTache);
router.get('/tache/:id', getTache);
router.put('/updateTache/:id', updateTache);
router.delete('/deleteTache/:id', deleteTache);

module.exports = router;

