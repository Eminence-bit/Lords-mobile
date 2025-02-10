const jwt = require('jsonwebtoken');
 require('dotenv').config();
 
exports.authenticate = (req, res, next) => {
 const token = req.query.token || req.headers.authorization.split(' ')[1];
 console.log(token);
  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decoded) => {
    if (err)
      return res.status(401).json({ error: 'Unauthorized' });
    req.user = decoded;
    next();
  });
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ error: 'Forbidden' });
  next();
};
