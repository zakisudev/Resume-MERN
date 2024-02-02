const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  getSocialLinks,
  createSocialLink,
  deleteSocialLink,
} = require('../controllers/socialLinks.controller');

router.route('/').get(getSocialLinks).post(protect, createSocialLink);
router.route('/:id').put(protect, deleteSocialLink);

module.exports = router;
