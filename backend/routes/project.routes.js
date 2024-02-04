const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projects.controller');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/project-pictures/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router
  .route('/')
  .get(getProjects)
  .post(protect, upload.single('image'), createProject);
router
  .route('/:id')
  .get(getProjects)
  .put(protect, updateProject, deleteProject);

module.exports = router;
