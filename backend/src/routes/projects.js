const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  bulkDeleteProjects,
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/auth');
const { projectValidation, validate } = require('../middleware/validation');

// Public routes
router.get('/', getProjects);
router.get('/:slug', getProject);

// Protected routes
router.post('/', protect, projectValidation, validate, createProject);
router.put('/:id', protect, projectValidation, validate, updateProject);
router.delete('/:id', protect, deleteProject);

// Admin only routes
router.delete('/', protect, authorize('admin'), bulkDeleteProjects);

module.exports = router;
