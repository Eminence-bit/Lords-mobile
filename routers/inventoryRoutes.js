const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const Hero = require('../models/heroes.model');
const User = require('../models/user.model');

router.get('/', authenticate, async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const heroes = await Hero.find();
      res.render('admininventory', { heroes });
    } else {
      const user = await User.findById(req.user.id).populate('inventory');
      res.render('inventory', { inventory: user.inventory });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
