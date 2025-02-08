const Constellation = require('../models/constellation.model');
exports.getConstellations = async (req, res) => {
  try {
    const constellations = await Constellation.find();
    res.json(constellations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createConstellation = async (req, res) => {
  try {
    const constellation = new Constellation(req.body);
    await constellation.save();
    res.json(constellation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
