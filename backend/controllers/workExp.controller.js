const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const WorkExperience = require('../models/workExp.model');

// @desc    Fetch all work experiences
// @route   GET /api/workExp
// @access  Public
const getWorkExperiences = asyncHandler(async (req, res) => {
  try {
    const works = await WorkExperience.findOne({
      userId: req.params.id,
    });
    if (!works) {
      return res
        .status(404)
        .json({ message: 'Work experience not found', status: false });
    }

    res.status(200).json({ works, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// @desc    Fetch single work experience
// @route   GET /api/workExp/:id
// @access  Public
const getWorkExperienceById = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json({ message: 'Invalid work experience id', status: false });
  }

  try {
    const workExperience = await WorkExperience.findOne({
      userId: req.params.id,
    });

    if (!workExperience) {
      return res
        .status(404)
        .json({ message: 'Work experience not found', status: false });
    }

    res.status(200).json({ works: workExperience, status: true });
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
    return res.status(401).json({ message: 'Not authorized', status: false });
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
    return res
      .status(400)
      .json({ message: 'Please fill all fields', status: false });
  }

  try {
    const workExperienceExists = await WorkExperience.findOne({
      userId: req.user._id,
    });

    if (!workExperienceExists) {
      const createdWorkExperience = await WorkExperience.create({
        work: {
          companyName,
          position,
          startDate,
          endDate,
          description,
          city,
          state,
        },
        userId: req.user._id,
      });

      if (!createdWorkExperience) {
        return res.status(400).json({
          message: 'Unable to create work experience',
          status: false,
        });
      }

      return res
        .status(201)
        .json({ works: createdWorkExperience, status: true });
    }

    const existingWorkExperience = workExperienceExists.work.find(
      (w) =>
        w.companyName === companyName &&
        w.position === position &&
        w.startDate === startDate &&
        w.endDate === endDate
    );

    if (workExperienceExists && existingWorkExperience) {
      return res
        .status(400)
        .json({ message: 'Work experience already exists', status: false });
    }

    if (workExperienceExists && !existingWorkExperience) {
      workExperienceExists.work.push({
        companyName,
        position,
        startDate,
        endDate,
        description,
        city,
        state,
      });

      const updatedWorkExperience = await workExperienceExists.save();

      if (!updatedWorkExperience) {
        return res
          .status(400)
          .json({ message: 'Unable to create work experience', status: false });
      }

      return res
        .status(201)
        .json({ works: updatedWorkExperience, status: true });
    }
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
    return res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json({ message: 'Invalid work experience', status: false });
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
    return res
      .status(400)
      .json({ message: 'Please fill at least one field', status: false });
  }

  try {
    const exp = await WorkExperience.findOne({
      userId: req.user._id,
    });

    if (!exp) {
      return res
        .status(404)
        .json({ message: 'Work experience not found', status: false });
    }

    const existingWorkExperience = exp.work.find(
      (w) => w._id.toString() === req.params.id
    );

    if (exp && !existingWorkExperience) {
      return res
        .status(404)
        .json({ message: 'Work experience not found', status: false });
    }

    if (exp && existingWorkExperience) {
      const updatedWorkExperience = exp.work.map((w) =>
        w._id.toString() === req.params.id
          ? {
              ...w,
              companyName: companyName || w.companyName,
              position: position || w.position,
              startDate: startDate || w.startDate,
              endDate: endDate || w.endDate,
              description: description || w.description,
              city: city || w.city,
              state: state || w.state,
            }
          : w
      );

      exp.work = updatedWorkExperience;
      await exp.save();

      return res.status(200).json({ works: exp, status: true });
    }
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
