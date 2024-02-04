const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} = require('../controllers/educations.controller');

router.route('/').post(protect, createEducation);
router
  .route('/:id')
  .get(getEducations)
  .put(protect, updateEducation)
  .delete(protect, deleteEducation);

module.exports = router;
