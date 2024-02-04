const asyncHandler = require('express-async-handler');
const Me = require('../models/me');
const mongoose = require('mongoose');
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
      return res
        .status(401)
        .json({ message: 'Invalid credentials', status: false });
    }

    const isMatch = await comparePassword(password, me.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: 'Invalid credentials', status: false });
    }

    return res
      .status(200)
      .cookie('jwt', generateToken(me), {
        httpOnly: true,
      })
      .json({ user: me._id, status: true });
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Invalid credentials', status: false });
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

// @desc    Get profile
// @route   GET /api/auth/profile/:id
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(404).json({ message: 'User not found', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({ message: 'Invalid user Id', status: false });
  }

  try {
    const me = await Me.findById(req.params.id).select('-password');

    if (!me) {
      res.status(404).json({ message: 'User not found', status: false });
    }

    res.status(200).json({ profile: me, status: true });
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error ocurred, try again later', status: false });
  }
});

// @desc    Update profile
// @route   PUT /api/auth/profile/:id
// @access  Private
const updateMe = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  if (!req.user) {
    return res.status(404).json({ message: 'User not found', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: 'Invalid user Id', status: false });
  }

  if (!username && !email && !req.file) {
    return res
      .status(400)
      .json({ message: 'Please fill at least one field', status: false });
  }

  try {
    const updatedMe = await Me.findById(req.params.id);

    if (!updatedMe) {
      return res
        .status(404)
        .json({ message: 'User not updated', status: false });
    }

    if (username) updatedMe.username = username;
    if (email) updatedMe.email = email;
    if (req.file) updatedMe.avatar = req.file?.path;

    await updatedMe.save();

    res.status(200).json({ profile: updatedMe, status: true });
  } catch (error) {
    return res.status(404).json({ message: error.message, status: false });
  }
});

// @desc    Delete Me
// @route   DELETE /api/auth/profile/:id
// @access  Private
const deleteMe = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(404).json({ message: 'User not found', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({ message: 'Invalid user Id', status: false });
  }

  try {
    const deletedMe = await Me.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedMe) {
      res.status(404).json({ message: 'User not deleted', status: false });
    }

    res
      .status(200)
      .json({ message: 'User deleted successfully', status: true });
  } catch (error) {
    res.status(404).json({ message: error.message, status: false });
  }
});

module.exports = {
  registerMe,
  logMeIn,
  logMeOut,
  getMe,
  updateMe,
  deleteMe,
};
