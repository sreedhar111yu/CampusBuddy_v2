//authMiddleware.js
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Mentee = require('../models/Mentee');

const protect = async (req, res, next) => {
  let token;

  // Check for token in cookie or Authorization header
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await Student.findById(decoded.id);
    if (!user) {
      user = await Mentee.findById(decoded.id);
    }

    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

module.exports = { protect };