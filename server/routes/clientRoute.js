import express from 'express';
import {
  createClient,
  getClient,
  getClients,
  updateClient,
  deleteClient,
} from '../controllers/clientController.js';

const router = express.Router();

router.get('/clients', getClients);
router.post('/newClient', createClient);
router.get('/client/:id', getClient);
router.put('/updateClient/:id', updateClient);
router.delete('/deleteClient/:id', deleteClient);

export default router;
