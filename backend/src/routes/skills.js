const express = require('express');
const router = express.Router();
const {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
  bulkDeleteSkills,
  reorderSkills,
} = require('../controllers/skillController');
const { protect, authorize } = require('../middleware/auth');
const { skillValidation, validate } = require('../middleware/validation');

// Public routes
router.get('/', getSkills);
router.get('/:id', getSkill);

// Protected routes
router.post('/', protect, skillValidation, validate, createSkill);
router.put('/reorder', protect, reorderSkills);
router.put('/:id', protect, skillValidation, validate, updateSkill);
router.delete('/:id', protect, deleteSkill);

// Admin only routes
router.delete('/', protect, authorize('admin'), bulkDeleteSkills);

module.exports = router;
