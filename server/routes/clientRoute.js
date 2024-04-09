const express = require('express');
const {
  createClient,
  getClient,
  getClients,
  getClientByEmail,
  updateClient,
  deleteClient,
} = require('../controllers/clientController.js');

const router = express.Router();

router.get('/clients', getClients);
router.post('/newClient', createClient);
router.get('/client/:id', getClient);
router.get('/client/email/:email', getClientByEmail);
router.put('/updateClient/:id', updateClient);
router.delete('/deleteClient/:id', deleteClient);

module.exports = router;
