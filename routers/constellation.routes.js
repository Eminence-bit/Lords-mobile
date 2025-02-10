const express = require('express');
const router = express.Router();
const constellationController = require('../controllers/constellation.controller');
router.get('/', constellationController.getConstellations); 
router.post('/', constellationController.createConstellation);
module.exports = router;
