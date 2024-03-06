import express from 'express';

import {
  createRéappro,
  getRéappro,
  getRéappros,
  updateRéappro,
  deleteRéappro,
} from '../controllers/réapproController.js';

const router = express.Router();

router.get('/réappros', getRéappros);
router.post('/newRéappro', createRéappro);
router.get('/réappro/:id', getRéappro);
router.put('/updateRéappro/:id', updateRéappro);
router.delete('/deleteRéappro/:id', deleteRéappro);

export default router;
