const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} = require('../controllers/educations.controller');

router.route('/').get(getEducations).post(protect, createEducation);
router
  .route('/:id')
  .put(protect, updateEducation)
  .delete(protect, deleteEducation);

module.exports = router;
