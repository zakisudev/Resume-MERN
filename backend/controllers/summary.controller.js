const asyncHandler = require('express-async-handler');
const Summary = require('../models/summary.model');
const mongoose = require('mongoose');

// @desc    Get all summaries
// @route   GET /api/summaries
// @access  Public
const getSummary = asyncHandler(async (req, res) => {
  try {
    const summary = await Summary.find({});
    res.status(200).json({ summary, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @dec    Create a summary
// @route  POST /api/summaries
// @access Private
const createSummary = asyncHandler(async (req, res) => {
  const { summary } = req.body;

  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (!summary) {
    res.status(400).json({ message: 'Please fill all fields', status: false });
  }

  try {
    const existingSummary = await Summary.findOne({ userId: req.user._id });

    if (existingSummary) {
      return res
        .status(400)
        .json({ message: 'Summary already exists', status: false });
    }

    const createdSummary = await Summary.create({
      summary,
      userId: req.user._id,
    });

    if (!createdSummary) {
      res
        .status(400)
        .json({ message: 'Unable to create summary', status: false });
    }

    res.status(201).json({ summary: createdSummary, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Update a summary
// @route   PUT /api/summaries/:id
// @access  Private
const updateSummary = asyncHandler(async (req, res) => {
  const { summary } = req.body;

  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(404)
      .json({ message: 'Education not found', status: false });
  }

  if (!summary) {
    return res
      .status(400)
      .json({ message: 'Please fill at least one field', status: false });
  }

  try {
    const existingSummary = await Summary.findOne({ userId: req.user._id });

    if (!existingSummary) {
      return res
        .status(404)
        .json({ message: 'Summary not found', status: false });
    }

    const updatedSummary = await existingSummary.updateOne({
      summary,
    });

    if (!updatedSummary) {
      res
        .status(400)
        .json({ message: 'Unable to update summary', status: false });
    }

    res.status(200).json({ summary: updatedSummary, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Delete a summary
// @route   DELETE /api/summaries/:id
// @access  Private
const deleteSummary = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(404)
      .json({ message: 'Education not found', status: false });
  }

  try {
    const deletedSummary = await Summary.findByIdAndDelete(req.params.id);

    if (!deletedSummary) {
      res
        .status(400)
        .json({ message: 'Unable to delete summary', status: false });
    }

    res.status(200).json({ id: deleteSummary._id, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

module.exports = {
  getSummary,
  createSummary,
  updateSummary,
  deleteSummary,
};
