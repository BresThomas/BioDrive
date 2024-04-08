const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/users', userController.getUsers);
router.post('/newUser', userController.createUser);
router.get('/user/:id', userController.getUser);
router.put('/updateUser/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
