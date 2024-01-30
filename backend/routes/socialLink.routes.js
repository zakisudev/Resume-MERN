const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const {
  getSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} = require('../controllers/socialLinks.controller');

router.route('/').get(getSocialLinks).post(protect, createSocialLink);
router.route('/:id').put(protect, updateSocialLink, deleteSocialLink);

module.exports = router;
