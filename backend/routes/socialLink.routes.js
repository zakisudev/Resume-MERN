const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  getSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} = require('../controllers/socialLinks.controller');

router.route('/').get(getSocialLinks).post(protect, createSocialLink);
router.route('/:id').put(protect, updateSocialLink, deleteSocialLink);

module.exports = router;
