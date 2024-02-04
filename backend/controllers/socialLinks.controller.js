const asyncHandler = require('express-async-handler');
const SocialLink = require('../models/socialLink.model');
const mongoose = require('mongoose');

// @desc    Fetch all social links
// @route   GET /api/socialLinks/:id
// @access  Public
const getSocialLinks = asyncHandler(async (req, res) => {
  const uId = req.params.id;
  try {
    const socials = await SocialLink.findOne({
      userId: uId,
    });
    res.status(200).json({ socials, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// @desc    Create a social link
// @route   POST /api/socialLinks
// @access  Private
const createSocialLink = asyncHandler(async (req, res) => {
  const { link, socialName } = req.body;

  if (!req.user) {
    res.status(401).json({ message: 'Not authorized', status: false });
  }

  if (!link || !socialName) {
    res.status(400).json({ message: 'Please fill all fields', status: false });
  }

  try {
    const sl = await SocialLink.findOne({ userId: req.user._id });

    if (!sl) {
      const newSocialLink = await SocialLink.create({
        SocialLink: [
          {
            socialName,
            link,
          },
        ],
        userId: req.user._id,
      });

      return res.status(201).json({ socials: newSocialLink, status: true });
    }

    const existingLink = sl.SocialLink.find((s) => s.socialName === socialName);

    if (sl && existingLink) {
      res
        .status(400)
        .json({ message: 'Social link already exists', status: false });
    } else if (sl && !existingLink) {
      sl.SocialLink.push({ socialName, link });
      await sl.save();

      return res.status(201).json({ socials: sl, status: true });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
});

// @desc    Update a social link
// @route   PUT /api/socialLinks/:id
// @access  Private
const updateSocialLink = asyncHandler(async (req, res) => {
  const { link, socialName } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized', status: false });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json({ message: 'Invalid social link id', status: false });
  }

  if (req.user._id.toString() !== req.params.id) {
    return res.status(401).json({ message: 'Not authorized', status: false });
  }

  if (!link && !socialName) {
    return res
      .status(400)
      .json({ message: 'Please change at least one field', status: false });
  }

  try {
    const sl = await SocialLink.findOne({ userId: req.params.id });

    if (!sl) {
      res
        .status(404)
        .json({ message: 'Social links not found', status: false });
    }

    const existingLink = sl.SocialLink.find((s) => s.socialName === socialName);

    if (sl && !existingLink) {
      res.status(400).json({ message: 'Social link not found', status: false });
    }

    const updatedLink = sl.SocialLink.map((s) =>
      s.socialName === socialName ? { ...s, link } : s
    );

    sl.SocialLink = updatedLink;
    await sl.save();

    res.status(200).json({ socials: sl, status: true });
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
