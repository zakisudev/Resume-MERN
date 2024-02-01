const express = require('express');
const router = express.Router();
const {
  registerMe,
  logMeIn,
  logMeOut,
  getMe,
  updateMe,
  deleteMe,
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

router.route('/register').post(registerMe);
router.route('/login').post(logMeIn);
router.route('/logout').get(protect, logMeOut);
router
  .route('/profile/:id')
  .get(protect, getMe)
  .put(protect, upload.single('avatar'), updateMe)
  .delete(protect, deleteMe);

module.exports = router;
