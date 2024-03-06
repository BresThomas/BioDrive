import express from 'express';

import {
  createCarburant,
  getCarburant,
  getCarburants,
  updateCarburant,
  deleteCarburant,
} from '../controllers/carburantController.js';

const router = express.Router();

router.get('/carburants', getCarburants);
router.post('/newCarburant', createCarburant);
router.get('/carburant/:id', getCarburant);
router.put('/updateCarburant/:id', updateCarburant);
router.delete('/deleteCarburant/:id', deleteCarburant);

export default router;
