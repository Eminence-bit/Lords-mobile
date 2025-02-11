const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroes.controller');
const { adminOnly, authenticate } = require('../middleware/auth');
router.get('/',authenticate, heroController.getHeroes);
router.post('/',authenticate, heroController.createHero);
module.exports = router;
