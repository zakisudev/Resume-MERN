const asyncHandler = require('express-async-handler');
const SocialLink = require('../models/socialLink.model');
const mongoose = require('mongoose');

// @desc    Fetch all social links
// @route   GET /api/socialLinks
// @access  Public
const getSocialLinks = asyncHandler(async (req, res) => {
  try {
    const socialLinks = await SocialLink.find({});
    res.status(200).json({ socialLinks, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// @desc    Create a social link
// @route   POST /api/socialLinks
// @access  Private
const createSocialLink = asyncHandler(async (req, res) => {
  const { socialLink } = req.body;

  try {
    const createdSocialLink = await SocialLink.create({
      socialLink,
    });

    if (!createdSocialLink) {
      res
        .status(400)
        .json({ message: 'Unable to create social link', status: false });
    }

    res.status(201).json({ createdSocialLink, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Update a social link
// @route   PUT /api/socialLinks/:id
// @access  Private
const updateSocialLink = asyncHandler(async (req, res) => {
  const { socialLink } = req.body;

  if (!req.user) {
    res.status(401).json({ message: 'Not authorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid social link id', status: false });
  }

  try {
    const updatedSocialLink = await SocialLink.findOneAndUpdate(
      { _id: req.params.id },
      {
        socialLink,
      },
      { new: true }
    );

    if (!updatedSocialLink) {
      res
        .status(400)
        .json({ message: 'Unable to update social link', status: false });
    }

    res.status(200).json({ updatedSocialLink, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Delete a social link
// @route   DELETE /api/socialLinks/:id
// @access  Private
const deleteSocialLink = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: 'Not authorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid social link id', status: false });
  }

  try {
    const deletedSocialLink = await SocialLink.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedSocialLink) {
      res
        .status(400)
        .json({ message: 'Unable to delete social link', status: false });
    }

    res.status(200).json({ id: deletedSocialLink._id, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

module.exports = {
  getSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
};
