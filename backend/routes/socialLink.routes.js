const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  getSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} = require('../controllers/socialLinks.controller');

router.route('/').post(protect, createSocialLink);
router
  .route('/:id')
  .get(getSocialLinks)
  .put(protect, updateSocialLink)
  .delete(protect, deleteSocialLink);

module.exports = router;
