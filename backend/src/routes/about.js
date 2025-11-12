const express = require('express');
const router = express.Router();
const {
  getAbout,
  updateAbout,
  getHero,
  getNavigation,
  getFooter,
  seedAbout,
} = require('../controllers/aboutController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAbout);
router.get('/hero', getHero);
router.get('/navigation', getNavigation);
router.get('/footer', getFooter);

// Protected routes
router.put('/', protect, updateAbout);

// Admin only routes
router.post('/seed', protect, authorize('admin'), seedAbout);

module.exports = router;
