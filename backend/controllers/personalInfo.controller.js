const asyncHandler = require('express-async-handler');
const PersonalInformation = require('../models/personalInformation.model');
const mongoose = require('mongoose');

// @desc    Get all personal information
// @route   GET /api/personals
// @access  Public
const getPersonalInformation = asyncHandler(async (_, res) => {
  try {
    const personalInformation = await PersonalInformation.find({});
    res.status(200).json({ personalInformation, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// @desc    Create personal information
// @route   POST /api/personals
// @access  Private
const createPersonalInformation = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, address, city, state } = req.body;

  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !address ||
    !city ||
    !state
  ) {
    res.status(400).json({ message: 'Please fill all fields', status: false });
  }

  try {
    const personalInformation = await PersonalInformation.create({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
    });

    if (!personalInformation) {
      res.status(400).json({
        message: 'Unable to create personal information',
        status: false,
      });
    }

    res.status(201).json({ personalInformation, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Update personal information
// @route   PUT /api/personals/:id
// @access  Private
const updatePersonalInformation = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, address, city, state } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid ID', status: false });
  }

  if (
    !firstName &&
    !lastName &&
    !email &&
    !phone &&
    !address &&
    !city &&
    !state
  ) {
    return res
      .status(400)
      .json({ message: 'Please fill at least one field', status: false });
  }

  try {
    const updatedInformation = await PersonalInformation.findOneAndUpdate(
      { _id: req.params.id },
      {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
      },
      { new: true }
    );

    if (!updatedInformation) {
      return res.status(404).json({
        message: 'Unable to update Personal information',
        status: false,
      });
    }

    res.status(200).json({ updatedInformation, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Delete personal information
// @route   DELETE /api/personals/:id
// @access  Private
const deletePersonalInformation = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized', status: false });
  }

  try {
    const personalInformation = await PersonalInformation.findById(
      req.params.id
    );

    if (!personalInformation) {
      return res.status(404).json({
        message: 'Personal information not found',
        status: false,
      });
    }

    await personalInformation.remove();

    return res
      .status(200)
      .json({ message: 'Deleted successfully', status: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
});

module.exports = {
  getPersonalInformation,
  createPersonalInformation,
  updatePersonalInformation,
  deletePersonalInformation,
};
