// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const auth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const userId = jwt.verify(token, process.env.JWT_SECRET);
      req.user = userId
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = async(req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const userId = jwt.verify(token, process.env.JWT_SECRET);
      const userCheck = await userModel.findOne({_id : userId.userId})
      if (userCheck.isAdmin === true){
        next()
      }
  }
  else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { auth, admin };
