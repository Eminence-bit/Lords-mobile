const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth');
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/inventory', authenticate, userController.getInventory);
router.put('/inventory', authenticate, userController.updateInventory);
module.exports = router;
