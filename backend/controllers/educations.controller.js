const asyncHandler = require('express-async-handler');
const Education = require('../models/education.model');
const mongoose = require('mongoose');

// @desc    Get all education
// @route   GET /api/educations
// @access  Public
const getEducations = asyncHandler(async (_, res) => {
  try {
    const educations = await Education.find({});
    res.status(200).json({ educations, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// @desc    Create education
// @route   POST /api/educations
// @access  Private
const createEducation = asyncHandler(async (req, res) => {
  const { schoolName, degree, fieldOfStudy, startDate, endDate, description } =
    req.body;

  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (
    !schoolName ||
    !degree ||
    !fieldOfStudy ||
    !startDate ||
    !endDate ||
    !description
  ) {
    res.status(400).json({ message: 'Please fill all fields', status: false });
  }

  try {
    const education = await Education.create({
      schoolName,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      description,
      userId: req.user._id,
    });

    if (!education) {
      res
        .status(400)
        .json({ message: 'Unable to create education', status: false });
    }

    res.status(201).json({ education, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Update education
// @route   PUT /api/educations/:id
// @access  Private
const updateEducation = asyncHandler(async (req, res) => {
  const { schoolName, degree, fieldOfStudy, startDate, endDate, description } =
    req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(404)
      .json({ message: 'Education not found', status: false });
  }

  if (
    !schoolName &&
    !degree &&
    !fieldOfStudy &&
    !startDate &&
    !endDate &&
    !description
  ) {
    return res
      .status(400)
      .json({ message: 'Please fill at least one field', status: false });
  }

  try {
    const updatedEducation = await Education.findOneAndUpdate(
      { _id: req.params.id },
      {
        schoolName,
        degree,
        fieldOfStudy,
        startDate,
        endDate,
        description,
      },
      { new: true }
    );

    if (!updatedEducation) {
      return res
        .status(400)
        .json({ message: 'Unable to update education', status: false });
    }

    res.status(200).json({ updatedEducation, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// @desc    Delete education
// @route   DELETE /api/educations/:id
// @access  Private
const deleteEducation = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(404)
      .json({ message: 'Education not found', status: false });
  }

  try {
    const deletedEducation = await Education.findByIdAndDelete(req.params.id);

    if (!deletedEducation) {
      return res
        .status(400)
        .json({ message: 'Unable to delete education', status: false });
    }

    res.status(200).json({ id: deletedEducation._id, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

module.exports = {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
};
