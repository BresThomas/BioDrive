import express from 'express';

import {
  createIncident,
  getIncident,
  getIncidents,
  updateIncident,
  deleteIncident,
} from '../controllers/incidentController.js';

const router = express.Router();

router.get('/incidents', getIncidents);
router.post('/newIncident', createIncident);
router.get('/incident/:id', getIncident);
router.put('/updateIncident/:id', updateIncident);
router.delete('/deleteIncident/:id', deleteIncident);

export default router;
