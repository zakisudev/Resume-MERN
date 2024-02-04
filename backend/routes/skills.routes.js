const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require('../controllers/skills.controller');

router.route('/').post(protect, createSkill);
router
  .route('/:id')
  .get(getSkills)
  .put(protect, updateSkill)
  .delete(protect, deleteSkill);

module.exports = router;
