const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projects.controller');

router.route('/').get(getProjects).post(protect, createProject);
router.route('/:id').put(protect, updateProject, deleteProject);

module.exports = router;
