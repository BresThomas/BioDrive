const express = require('express');
const {
  createIncident,
  getIncident,
  getIncidents,
  updateIncident,
  deleteIncident,
} = require('../controllers/incidentController.js');

const router = express.Router();

router.get('/incidents', getIncidents);
router.post('/newIncident', createIncident);
router.get('/incident/:id', getIncident);
router.put('/updateIncident/:id', updateIncident);
router.delete('/deleteIncident/:id', deleteIncident);

module.exports = router;
