import express from 'express';

import {
  createEmploye,
  getEmploye,
  getEmployes,
  updateEmploye,
  deleteEmploye,
} from '../controllers/employeController.js';

const router = express.Router();

router.get('/employes', getEmployes);
router.post('/newEmploye', createEmploye);
router.get('/employe/:id', getEmploye);
router.put('/updateEmploye/:id', updateEmploye);
router.delete('/deleteEmploye/:id', deleteEmploye);

export default router;
