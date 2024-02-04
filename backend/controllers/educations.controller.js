const asyncHandler = require('express-async-handler');
const Education = require('../models/education.model');
const mongoose = require('mongoose');

// @desc    Get all education
// @route   GET /api/educations/:id
// @access  Public
const getEducations = asyncHandler(async (req, res) => {
  try {
    const educations = await Education.findOne({
      userId: req.params.id,
    });
    res.status(200).json({ educations, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// @desc    Create education
// @route   POST /api/educations
// @access  Private
const createEducation = asyncHandler(async (req, res) => {
  const { schoolName, degree, fieldOfStudy, startYear, endYear, description } =
    req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (
    !schoolName ||
    !degree ||
    !fieldOfStudy ||
    !startYear ||
    !endYear ||
    !description
  ) {
    return res
      .status(400)
      .json({ message: 'Please fill all fields', status: false });
  }

  try {
    const educationExists = await Education.findOne({
      userId: req.user?._id,
    });

    if (!educationExists) {
      const newEducation = await Education.create({
        Educations: {
          schoolName,
          degree,
          fieldOfStudy,
          startYear,
          endYear,
          description,
        },
        userId: req.user?._id,
      });

      if (!newEducation) {
        return res
          .status(400)
          .json({ message: 'Unable to create education', status: false });
      }

      return res.status(201).json({ education: newEducation, status: true });
    }

    const existingEducation = educationExists.Educations.find(
      (e) => e.schoolName === schoolName
    );

    if (educationExists && existingEducation) {
      return res
        .status(400)
        .json({ message: 'Education already exists', status: false });
    }

    if (educationExists && !existingEducation) {
      educationExists.Educations.push({
        schoolName,
        degree,
        fieldOfStudy,
        startYear,
        endYear,
        description,
      });

      const updatedEducation = await educationExists.save();

      if (!updatedEducation) {
        return res
          .status(400)
          .json({ message: 'Unable to create education', status: false });
      }

      return res
        .status(201)
        .json({ education: updatedEducation, status: true });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Update education
// @route   PUT /api/educations/:educationId
// @access  Private
const updateEducation = asyncHandler(async (req, res) => {
  const { schoolName, degree, fieldOfStudy, startYear, endYear, description } =
    req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(404)
      .json({ message: 'Invalid Education id', status: false });
  }

  if (
    !schoolName &&
    !degree &&
    !fieldOfStudy &&
    !startYear &&
    !endYear &&
    !description
  ) {
    return res
      .status(400)
      .json({ message: 'Please change at least one field', status: false });
  }

  try {
    const edu = await Education.findOne({ userId: req.user._id });
    const schoolNames = edu.Educations.map((e) => e.schoolName);

    if (!edu) {
      return res
        .status(400)
        .json({ message: 'Education not found', status: false });
    }

    const existingEducation = edu.Educations.find(
      (e) => e._id.toString() === req.params.id
    );

    if (edu && !existingEducation) {
      return res
        .status(400)
        .json({ message: 'Education not found', status: false });
    }

    if (edu && existingEducation && schoolNames.includes(schoolName)) {
      return res
        .status(400)
        .json({ message: 'School name already in use', status: false });
    }

    if (edu && existingEducation && !schoolNames.includes(schoolName)) {
      const updatedEducation = edu.Educations.map((e) =>
        e._id.toString() === req.params.id
          ? {
              ...e,
              schoolName: schoolName || e.schoolName,
              degree: degree || e.degree,
              fieldOfStudy: fieldOfStudy || e.fieldOfStudy,
              startYear: startYear || e.startYear,
              endYear: endYear || e.endYear,
              description: description || e.description,
            }
          : e
      );

      edu.Educations = updatedEducation;
      await edu.save();

      res.status(200).json({ education: edu, status: true });
    }
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
