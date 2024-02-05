const asyncHandler = require('express-async-handler');
const Skill = require('../models/skills.model');
const mongoose = require('mongoose');

// @desc    Get all skills
// @route   GET /api/skills/:id
// @access  Public
const getSkills = asyncHandler(async (req, res) => {
  try {
    const skills = await Skill.findOne({
      userId: req.params.id,
    });
    if (!skills) {
      return res
        .status(404)
        .json({ message: 'Skills not found', status: false });
    }

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
    res.status(401).json({ message: 'Not authorized', status: false });
  }

  if (!skill || !type) {
    res.status(400).json({ message: 'Please fill all fields', status: false });
  }

  try {
    const sk = await Skill.findOne({
      userId: req.user?._id,
    });

    if (!sk) {
      const newSkill = await Skill.create({
        Languages: [
          {
            skill,
            type,
          },
        ],
        userId: req.user._id,
      });

      if (!newSkill) {
        return res
          .status(400)
          .json({ message: 'Unable to create skill', status: false });
      }

      return res.status(201).json({ skills: newSkill, status: true });
    }

    const existingSkill = sk.Languages.find(
      (s) => s.skill === skill && s.type === type
    );

    if (sk && existingSkill) {
      return res
        .status(400)
        .json({ message: 'Skill already exists', status: false });
    } else if (sk && !existingSkill) {
      sk.Languages.push({ skill, type });
      await sk.save();

      return res.status(201).json({ skills: sk, status: true });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Update a skill
// @route   PUT /api/skills/:skillId
// @access  Private
const updateSkill = asyncHandler(async (req, res) => {
  const { skill, type, _id: skillId } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: 'Invalid Skill id', status: false });
  }

  if (!skill && !type) {
    return res
      .status(400)
      .json({ message: 'Please fill at least one field', status: false });
  }

  try {
    const sk = await Skill.findOne({
      userId: req.user?._id,
    });
    const skillNames = sk.Languages.map((s) => s.skill);

    if (!sk) {
      return res
        .status(404)
        .json({ message: 'Skill not found', status: false });
    }

    const existingSkill = sk.Languages.find(
      (s) => s._id.toString() === skillId
    );

    if (sk && !existingSkill) {
      return res
        .status(400)
        .json({ message: 'Skill not found', status: false });
    }

    if (sk && existingSkill && skillNames.includes(skill)) {
      return res
        .status(400)
        .json({ message: 'Skill already exists', status: false });
    }

    const updatedSkill = sk.Languages.map((s) =>
      s._id.toString() === skillId
        ? { skill: skill || s.skill, type: type || s.type }
        : s
    );

    sk.Languages = updatedSkill;
    await sk.save();

    return res.status(200).json({ skills: sk, status: true });
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
