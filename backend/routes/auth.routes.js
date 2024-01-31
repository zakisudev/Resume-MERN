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

router.route('/register').post(registerMe);
router.route('/login').post(logMeIn);
router.route('/logout').get(protect, logMeOut);
router
  .route('/profile/:id')
  .get(protect, getMe)
  .put(protect, updateMe)
  .delete(protect, deleteMe);

module.exports = router;
