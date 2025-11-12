const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');
const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  validate,
} = require('../middleware/validation');

// Public routes
router.post('/login', loginValidation, validate, login);
router.post('/forgot-password', forgotPasswordValidation, validate, forgotPassword);
router.put('/reset-password/:resettoken', resetPasswordValidation, validate, resetPassword);

// Protected routes
router.get('/me', protect, getMe);
router.put('/update-password', protect, updatePassword);

// Admin only routes
router.post('/register', protect, authorize('admin'), registerValidation, validate, register);

module.exports = router;
