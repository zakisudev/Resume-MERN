const { verifyToken } = require('../utils/helpers');
const Me = require('../models/me');

const protect = async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.status(401).json({ message: 'Not authorized', status: false });
  }

  try {
    const decoded = verifyToken(token);

    req.user = await Me.findById(decoded._id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized', status: false });
  }
};

module.exports = protect;
