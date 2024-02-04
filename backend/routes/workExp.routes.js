const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  getWorkExperiences,
  getWorkExperienceById,
  createWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
} = require('../controllers/workExp.controller');

router.route('/').get(getWorkExperiences).post(protect, createWorkExperience);
router
  .route('/:id')
  .get(protect, getWorkExperienceById)
  .put(protect, updateWorkExperience)
  .delete(protect, deleteWorkExperience);

module.exports = router;
