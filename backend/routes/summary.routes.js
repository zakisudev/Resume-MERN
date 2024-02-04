const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  getSummary,
  createSummary,
  updateSummary,
} = require('../controllers/summary.controller');

router.route('/').get(getSummary).post(protect, createSummary);
router.route('/:id').get(getSummary).put(protect, updateSummary);

module.exports = router;
