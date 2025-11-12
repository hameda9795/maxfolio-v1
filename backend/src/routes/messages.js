const express = require('express');
const router = express.Router();
const {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  replyToMessage,
  toggleStar,
  deleteMessage,
  bulkDeleteMessages,
} = require('../controllers/messageController');
const { protect, authorize } = require('../middleware/auth');
const { messageValidation, validate } = require('../middleware/validation');

// Public routes
router.post('/', messageValidation, validate, createMessage);

// Protected routes
router.get('/', protect, getMessages);
router.get('/:id', protect, getMessage);
router.put('/:id', protect, updateMessage);
router.post('/:id/reply', protect, replyToMessage);
router.put('/:id/star', protect, toggleStar);
router.delete('/:id', protect, deleteMessage);

// Admin only routes
router.delete('/', protect, authorize('admin'), bulkDeleteMessages);

module.exports = router;
