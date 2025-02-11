const express = require('express');
const router = express.Router();
const constellationController = require('../controllers/constellation.controller');
const { authenticate } = require('../middleware/auth');
router.get('/',authenticate, constellationController.getConstellations); 
router.post('/',authenticate, constellationController.createConstellation);
module.exports = router;
