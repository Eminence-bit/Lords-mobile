const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroes.controller');
const { adminOnly } = require('../middleware/auth');
router.get('/', heroController.getHeroes);
router.post('/',adminOnly, heroController.createHero);
module.exports = router;
