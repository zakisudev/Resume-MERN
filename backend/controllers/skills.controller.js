const asyncHandler = require('express-async-handler');
const Skill = require('../models/skills.model');
const mongoose = require('mongoose');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = asyncHandler(async (_, res) => {
  try {
    const skills = await Skill.find({});
    res.status(200).json({ skills, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// @desc    Create skill
// @route   POST /api/skills
// @access  Private
const createSkill = asyncHandler(async (req, res) => {
  const { skill, type } = req.body;

  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (!skill || !type) {
    res.status(400).json({ message: 'Please fill all fields', status: false });
  }

  try {
    const skill = await Skill.create({
      skill,
      type,
    });

    if (!skill) {
      res
        .status(400)
        .json({ message: 'Unable to create skill', status: false });
    }

    res.status(201).json({ skill, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private
const updateSkill = asyncHandler(async (req, res) => {
  const { skill, type } = req.body;

  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({ message: 'Skill not found', status: false });
  }

  if (!skill || !type) {
    res.status(400).json({ message: 'Please fill all fields', status: false });
  }

  try {
    const updatedSkill = await Skill.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
      {
        skill,
        type,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSkill) {
      res
        .status(400)
        .json({ message: 'Unable to update skill', status: false });
    }

    res.status(200).json({ updatedSkill, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private
const deleteSkill = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).json({ message: 'Skill not found', status: false });
  }

  try {
    const deletedSkill = await Skill.findOneAndDelete({
      _id: mongoose.Types.ObjectId(req.params.id),
    });

    if (!deletedSkill) {
      res
        .status(400)
        .json({ message: 'Unable to delete skill', status: false });
    }

    res.status(200).json({ id: deletedSkill._id, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
