const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroes.controller');
router.get('/', heroController.getHeroes);
router.post('/', heroController.createHero);
module.exports = router;
