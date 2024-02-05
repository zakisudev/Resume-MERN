const { verifyToken } = require('../utils/helpers');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized, no token', status: false });
  }

  try {
    const decoded = verifyToken(token);

    req.user = await User.findById(decoded?._id).select('-password');
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: 'Unauthorized, invalid token', status: false });
  }
};

module.exports = protect;
