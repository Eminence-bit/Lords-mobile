require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "1d" }
    );
    console.log(token);
    res.json({ token:token, username:user.username , role:user.role });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("inventory");
    res.json(user.inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.inventory = req.body.inventory;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
