const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  getPersonalInformation,
  createPersonalInformation,
  updatePersonalInformation,
  deletePersonalInformation,
} = require('../controllers/personalInfo.controller');

router.route('/').get(getPersonalInformation);
router.route('/').post(protect, createPersonalInformation);
router.route('/:id').put(protect, updatePersonalInformation);
router.route('/:id').delete(protect, deletePersonalInformation);

module.exports = router;
