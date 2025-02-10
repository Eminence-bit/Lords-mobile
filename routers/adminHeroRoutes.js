const express = require('express');
const router = express.Router();
const { authenticate, adminOnly } = require('../middleware/auth');
const Hero = require('../models/heroes.model');

router.get('/', authenticate, adminOnly, async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/create', authenticate, adminOnly, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'createhero.html'));
});

router.post('/create', authenticate, adminOnly, async (req, res) => {
  try {
    const hero = new Hero(req.body);
    await hero.save();
    res.redirect('/admin/heroes');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/edit/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    res.render('edithero', { hero });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/edit/:id', authenticate, adminOnly, async (req, res) => {
  try {
    await Hero.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/admin/heroes');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/delete/:id', authenticate, adminOnly, async (req, res) => {
  try {
    await Hero.findByIdAndDelete(req.params.id);
    res.redirect('/admin/heroes');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
