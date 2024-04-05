const express = require('express');
const router = express.Router();

const {
  createTableIncidents,
  getTableIncidents,
  getTableIncident,
  updateTableIncident,
  deleteTableIncident,
} = require('../controllers/tableIncidentsController.js');

router.get('/table_incidents', getTableIncidents);
router.post('/newTableIncident', createTableIncidents);
router.get('/table_incident/:id', getTableIncident);
router.put('/updateTableIncident/:id', updateTableIncident);
router.delete('/deleteTableIncident/:id', deleteTableIncident);

module.exports = router;
