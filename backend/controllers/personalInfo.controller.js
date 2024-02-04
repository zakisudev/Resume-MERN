const asyncHandler = require('express-async-handler');
const PersonalInformation = require('../models/personalInformation.model');
const mongoose = require('mongoose');

// @desc    Get all personal information
// @route   GET /api/personals/:id
// @access  Public
const getPersonalInformation = asyncHandler(async (req, res) => {
  const uId = req.params?.id;
  try {
    const personal = await PersonalInformation.findOne({
      userId: uId,
    });
    res.status(200).json({ personal, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// @desc    Create personal information
// @route   POST /api/personals
// @access  Private
const createPersonalInformation = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    country,
    address,
    city,
    state,
    profession,
  } = req.body;

  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !country ||
    !address ||
    !city ||
    !state ||
    !profession
  ) {
    res.status(400).json({ message: 'Please fill all fields', status: false });
  }

  try {
    const existingPersonalInformation = await PersonalInformation.findOne({
      userId: req.user?._id,
    });

    if (existingPersonalInformation) {
      res.status(400).json({
        message: 'Personal information already exists',
        status: false,
      });
    }

    const newPersonalInfo = new PersonalInformation({
      PersonalInfo: {
        firstName,
        lastName,
        email,
        phone,
        country,
        address,
        city,
        state,
        profession,
      },
      userId: req.user._id,
    });

    const personalInformation = await newPersonalInfo.save();

    if (!personalInformation) {
      res.status(400).json({
        message: 'Unable to create personal information',
        status: false,
      });
    }

    await personalInformation.save();

    res.status(201).json({ personalInformation, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Update personal information
// @route   PUT /api/personal-info/:id
// @access  Private
const updatePersonalInformation = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    country,
    profession,
  } = req.body;

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
    !state &&
    !country &&
    !profession &&
    !req.file
  ) {
    return res
      .status(400)
      .json({ message: 'Please change at least one field', status: false });
  }

  try {
    const personalInformation = await PersonalInformation.findOne({
      userId: req.params.id,
    });

    if (!personalInformation) {
      return res.status(404).json({
        message: 'Personal information not found',
        status: false,
      });
    }

    if (personalInformation.userId?.toString() !== req.user._id?.toString()) {
      return res.status(401).json({ message: 'Unauthorized', status: false });
    }

    const updatedInfo = {
      firstName: firstName || personalInformation.PersonalInfo[0].firstName,
      lastName: lastName || personalInformation.PersonalInfo[0].lastName,
      email: email || personalInformation.PersonalInfo[0].email,
      phone: phone || personalInformation.PersonalInfo[0].phone,
      address: address || personalInformation.PersonalInfo[0].address,
      city: city || personalInformation.PersonalInfo[0].city,
      state: state || personalInformation.PersonalInfo[0].state,
      country: country || personalInformation.PersonalInfo[0].country,
      profession: profession || personalInformation.PersonalInfo[0].profession,
    };

    personalInformation.PersonalInfo = updatedInfo;

    const updatedPersonalInformation = await personalInformation.save();

    res.status(200).json({
      personalInformation: updatedPersonalInformation,
      status: true,
    });
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
