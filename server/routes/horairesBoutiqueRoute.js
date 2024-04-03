const express = require('express');
const horairesBoutiqueController = require('../controllers/horairesBoutiqueController.js');

const router = express.Router();

router.get('/horairesBoutique', horairesBoutiqueController.getHorairesBoutiques);
router.post('/newHorairesBoutique', horairesBoutiqueController.createHorairesBoutique);
router.get('/horairesBoutique/:id', horairesBoutiqueController.getHorairesBoutique);
router.put('/updateHorairesBoutique/:id', horairesBoutiqueController.updateHorairesBoutique);
router.delete('/deleteHorairesBoutique/:id', horairesBoutiqueController.deleteHorairesBoutique);

module.exports = router;
