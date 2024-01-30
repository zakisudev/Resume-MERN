const express = require('express');
const router = express.Router();
const {
  registerMe,
  logMeIn,
  logMeOut,
} = require('../controllers/auth.controller');
const protect = require('../middlewares/authMiddleware');

router.route('/register').post(registerMe);
router.route('/login').post(logMeIn);
router.route('/logout').get(protect, logMeOut);

module.exports = router;
