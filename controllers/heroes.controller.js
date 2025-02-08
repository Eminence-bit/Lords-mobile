const Hero = require('../models/Hero');
exports.getHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createHero = async (req, res) => {
  try {
    const hero = new Hero(req.body);
    await hero.save();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
