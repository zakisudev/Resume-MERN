const asyncHandler = require('express-async-handler');
const Me = require('../models/me');
const {
  comparePassword,
  hashPassword,
  generateToken,
} = require('../utils/helpers');

// @desc    Register
// @route   POST /api/auth/register
// @access  Public
const registerMe = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      res
        .status(400)
        .json({ message: 'Please fill all fields', status: false });
    }

    const meExists = await Me.findOne({
      $or: [{ email }, { username }],
    });

    if (meExists) {
      res.status(400).json({ message: 'User already exists', status: false });
    }

    await Me.create({
      email,
      username,
      password: await hashPassword(password),
    });

    res.status(201).json({ message: 'Registered successfully', status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Log in
// @route   POST /api/auth/login
// @access  Public
const logMeIn = asyncHandler(async (req, res) => {
  const { user, password } = req.body;

  try {
    const me =
      (await Me.findOne({ email: user })) ||
      (await Me.findOne({ username: user }));

    if (!me) {
      res.status(401).json({ message: 'Invalid credentials', status: false });
    }

    const isMatch = await comparePassword(password, me.password);

    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials', status: false });
    }

    res
      .status(200)
      .cookie('jwt', generateToken(me), {
        httpOnly: true,
      })
      .json({ message: 'Logged in successfully', status: true });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials', status: false });
  }
});

// @desc    Log out
// @route   GET /api/auth/logout
// @access  Private
const logMeOut = asyncHandler(async (_, res) => {
  res
    .status(200)
    .cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    .json({ message: 'Logged out successfully', status: true });
});

module.exports = {
  registerMe,
  logMeIn,
  logMeOut,
};
