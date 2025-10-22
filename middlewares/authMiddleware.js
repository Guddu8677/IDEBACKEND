const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) return res.status(401).json({ message: 'User not found' });
      next();
    } catch (error) {
      console.error('Auth Middleware Error:', error);
      return res.status(401).json({ message: 'Token invalid' });
    }
  } else {
    return res.status(401).json({ message: 'No token' });
  }
};

module.exports = { protect };
