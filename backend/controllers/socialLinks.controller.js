const asyncHandler = require('express-async-handler');
const SocialLink = require('../models/socialLink.model');
const mongoose = require('mongoose');

// @desc    Fetch all social links
// @route   GET /api/socialLinks
// @access  Public
const getSocialLinks = asyncHandler(async (req, res) => {
  try {
    const socials = await SocialLink.find({});
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

  try {
    const sl = await SocialLink.findOne({ userId: req.user._id });

    if (!sl) {
      const newSocialLink = new SocialLink({
        socialLink: [
          {
            socialName,
            link,
          },
        ],
        userId: req.user._id,
      });

      await newSocialLink.save();

      return res.status(201).json({ newSocialLink, status: true });
    } else {
      let found = false;
      const updatedSocialLink = sl.socialLink.map((s) => {
        if (s.socialName === socialName) {
          found = true;
          return { socialName, link };
        }
        return s;
      });

      if (!found) {
        updatedSocialLink.push({ socialName, link });
      }

      sl.socialLink = updatedSocialLink;
      await sl.save();

      return res.status(201).json({ sl, status: true });
    }
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
  deleteSocialLink,
};
