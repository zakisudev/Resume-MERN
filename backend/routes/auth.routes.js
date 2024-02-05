const express = require('express');
const router = express.Router();
const {
  registerUser,
  logMeIn,
  logMeOut,
  getUserProfile,
  updateProfile,
  deleteUser,
} = require('../controllers/auth.controller');
const protect = require('../middlewares/authMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profile-pictures/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route('/register').post(registerUser);
router.route('/login').post(logMeIn);
router.route('/logout').get(protect, logMeOut);
router
  .route('/profile/:id')
  .get(protect, getUserProfile)
  .put(protect, upload.single('avatar'), updateProfile)
  .delete(protect, deleteUser);

module.exports = router;
