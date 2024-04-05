const express = require('express');
const {
  createEmploye,
  getEmploye,
  getEmployes,
  updateEmploye,
  deleteEmploye,
} = require('../controllers/employeController.js');

const router = express.Router();

router.get('/employes', getEmployes);
router.post('/newEmploye', createEmploye);
router.get('/employe/:id', getEmploye);
router.put('/updateEmploye/:id', updateEmploye);
router.delete('/deleteEmploye/:id', deleteEmploye);

module.exports = router;
