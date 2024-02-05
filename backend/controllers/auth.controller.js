const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const {
  comparePassword,
  hashPassword,
  generateToken,
} = require('../utils/helpers');

// @desc    Register
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ message: 'Please fill all fields', status: false });
    }

    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      return res
        .status(400)
        .json({ message: 'User already exists', status: false });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters',
        status: false,
      });
    }

    if (username.length < 4) {
      return res.status(400).json({
        message: 'Username must be at least 4 characters',
        status: false,
      });
    }

    await User.create({
      email,
      username,
      password: await hashPassword(password),
    });

    return res
      .status(201)
      .json({ message: 'Registered successfully', status: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Log in
// @route   POST /api/auth/login
// @access  Public
const logMeIn = asyncHandler(async (req, res) => {
  const { user, password } = req.body;

  try {
    const oldUser =
      (await User.findOne({ email: user })) ||
      (await User.findOne({ username: user }));

    if (!oldUser) {
      return res
        .status(401)
        .json({ message: 'Invalid credentials', status: false });
    }

    const isMatch = await comparePassword(password, oldUser.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: 'Invalid credentials', status: false });
    }

    return res
      .status(200)
      .cookie('jwt', generateToken(oldUser), {
        httpOnly: true,
      })
      .json({
        user: {
          _id: oldUser._id,
          username: oldUser.username,
          email: oldUser.email,
          avatar: oldUser.avatar,
          isPremium: oldUser.isPremium,
          isAdmin: oldUser.isAdmin,
        },
        status: true,
      });
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
  return res
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
const getUserProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: 'Not authorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params?.id)) {
    return res.status(404).json({ message: 'Invalid user Id', status: false });
  }

  try {
    const user = await User.findById(req.params?.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found', status: false });
    }

    res.status(200).json({ profile: user, status: true });
  } catch (error) {
    return res
      .status(404)
      .json({ message: 'Error ocurred, try again later', status: false });
  }
});

// @desc    Update profile
// @route   PUT /api/auth/profile/:id
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  if (!req.user) {
    return res.status(404).json({ message: 'Not authorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params?.id)) {
    return res.status(404).json({ message: 'Invalid user Id', status: false });
  }

  if (!username && !email && !req.file) {
    return res
      .status(400)
      .json({ message: 'Please fill at least one field', status: false });
  }

  try {
    const user = await User.findById(req.params?.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found', status: false });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (req.file) user.avatar = req.file?.path;

    await user.save();

    return res.status(200).json({ profile: user, status: true });
  } catch (error) {
    return res.status(404).json({ message: error.message, status: false });
  }
});

// @desc    Delete User
// @route   DELETE /api/auth/profile/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: 'Not authorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params?.id)) {
    return res.status(404).json({ message: 'Invalid user Id', status: false });
  }

  try {
    const deletedUser = await User.findOneAndDelete({
      _id: req.params?.id,
    });

    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: 'User not deleted', status: false });
    }

    return res
      .status(200)
      .json({ message: 'User deleted successfully', status: true });
  } catch (error) {
    return res.status(404).json({ message: error.message, status: false });
  }
});

module.exports = {
  registerUser,
  logMeIn,
  logMeOut,
  getUserProfile,
  updateProfile,
  deleteUser,
};
