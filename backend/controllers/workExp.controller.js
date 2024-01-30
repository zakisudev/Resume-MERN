const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const WorkExperience = require('../models/workExp.model');

// @desc    Fetch all work experiences
// @route   GET /api/workExp
// @access  Public
const getWorkExperiences = asyncHandler(async (req, res) => {
  try {
    const workExperiences = await WorkExperience.find({});
    res.status(200).json({ workExperiences, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// @desc    Fetch single work experience
// @route   GET /api/workExp/:id
// @access  Public
const getWorkExperienceById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid work experience', status: false });
  }

  try {
    const workExperience = await WorkExperience.findById(req.params.id);

    if (!workExperience) {
      res
        .status(404)
        .json({ message: 'Work experience not found', status: false });
    }

    res.status(200).json({ workExperience, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// @desc    Create a work experience
// @route   POST /api/workExp
// @access  Private
const createWorkExperience = asyncHandler(async (req, res) => {
  const {
    companyName,
    position,
    startDate,
    endDate,
    description,
    city,
    state,
  } = req.body;

  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (
    !companyName ||
    !position ||
    !startDate ||
    !endDate ||
    !description ||
    !city ||
    !state
  ) {
    res.status(400).json({ message: 'Please fill all fields', status: false });
  }

  try {
    const createdWorkExperience = await WorkExperience.create({
      companyName,
      position,
      startDate,
      endDate,
      description,
      city,
      state,
    });

    if (!createdWorkExperience) {
      res.status(400).json({
        message: 'Unable to create work experience',
        status: false,
      });
    }

    res.status(201).json({ createdWorkExperience, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// @desc    Update a work experience
// @route   PUT /api/workExp/:id
// @access  Private
const updateWorkExperience = asyncHandler(async (req, res) => {
  const {
    companyName,
    position,
    startDate,
    endDate,
    description,
    city,
    state,
  } = req.body;

  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (
    !companyName &&
    !position &&
    !startDate &&
    !endDate &&
    !description &&
    !city &&
    !state
  ) {
    res
      .status(400)
      .json({ message: 'Please fill at least one field', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid work experience', status: false });
  }

  try {
    const updatedWorkExperience = await WorkExperience.findOneAndUpdate(
      { _id: req.params.id },
      {
        companyName,
        position,
        startDate,
        endDate,
        description,
        city,
        state,
      },
      { new: true }
    );

    if (!updatedWorkExperience) {
      res.status(400).json({
        message: 'Unable to update work experience',
        status: false,
      });
    }

    res.status(200).json({ updatedWorkExperience, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// @desc    Delete a work experience
// @route   DELETE /api/workExp/:id
// @access  Private
const deleteWorkExperience = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid work experience', status: false });
  }

  try {
    const deletedWorkExperience = await WorkExperience.findByIdAndDelete(
      req.params.id
    );

    if (!deletedWorkExperience) {
      res.status(400).json({
        message: 'Unable to delete work experience',
        status: false,
      });
    }

    res.status(200).json({ id: deletedWorkExperience._id, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

module.exports = {
  getWorkExperiences,
  getWorkExperienceById,
  createWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
};
