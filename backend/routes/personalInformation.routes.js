const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  getPersonalInformation,
  createPersonalInformation,
  updatePersonalInformation,
  deletePersonalInformation,
} = require('../controllers/personalInfo.controller');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/resume-pictures/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route('/').get(getPersonalInformation);
router.route('/').post(protect, createPersonalInformation);
router
  .route('/:id')
  .put(protect, upload.single('avatar'), updatePersonalInformation);
router.route('/:id').delete(protect, deletePersonalInformation);

module.exports = router;
