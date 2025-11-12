const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private
exports.getMessages = async (req, res, next) => {
  try {
    const {
      status,
      isStarred,
      search,
      sort = '-createdAt',
      page = 1,
      limit = 20,
    } = req.query;

    // Build query
    const query = {};

    if (status) query.status = status;
    if (isStarred !== undefined) query.isStarred = isStarred === 'true';
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    // Execute query with pagination
    const messages = await Message.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('reply.sentBy', 'username email');

    // Get total count
    const count = await Message.countDocuments(query);

    // Get status counts
    const statusCounts = {
      unread: await Message.countDocuments({ status: 'unread' }),
      read: await Message.countDocuments({ status: 'read' }),
      replied: await Message.countDocuments({ status: 'replied' }),
      archived: await Message.countDocuments({ status: 'archived' }),
    };

    res.json({
      success: true,
      count: messages.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      statusCounts,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single message
// @route   GET /api/messages/:id
// @access  Private
exports.getMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('reply.sentBy', 'username email');

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    // Mark as read if unread
    if (message.status === 'unread') {
      message.status = 'read';
      await message.save();
    }

    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new message (Contact form submission)
// @route   POST /api/messages
// @access  Public
exports.createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    // Send confirmation email to sender
    try {
      await sendEmail({
        email: email,
        subject: 'Message Received - Thank You!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0FF4C6;">Thank You for Getting in Touch!</h2>
            <p>Hi ${name},</p>
            <p>I've received your message and will get back to you as soon as possible.</p>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Your Message:</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            </div>
            <p>Best regards,<br>Portfolio Admin</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update message status
// @route   PUT /api/messages/:id
// @access  Private
exports.updateMessage = async (req, res, next) => {
  try {
    let message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    message = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reply to message
// @route   POST /api/messages/:id/reply
// @access  Private
exports.replyToMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide reply content',
      });
    }

    // Send reply email
    try {
      await sendEmail({
        email: message.email,
        subject: `Re: ${message.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0FF4C6;">Reply to Your Message</h2>
            <p>Hi ${message.name},</p>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              ${content}
            </div>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;"><strong>Your Original Message:</strong></p>
            <p style="color: #666; font-size: 12px;">${message.message}</p>
          </div>
        `,
      });

      // Update message
      message.reply = {
        content,
        sentAt: Date.now(),
        sentBy: req.user.id,
      };
      message.status = 'replied';
      await message.save();

      res.json({
        success: true,
        message: 'Reply sent successfully',
        data: message,
      });
    } catch (emailError) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send reply email',
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle star status
// @route   PUT /api/messages/:id/star
// @access  Private
exports.toggleStar = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    message.isStarred = !message.isStarred;
    await message.save();

    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    await message.deleteOne();

    res.json({
      success: true,
      message: 'Message deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk delete messages
// @route   DELETE /api/messages
// @access  Private (Admin only)
exports.bulkDeleteMessages = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide message IDs to delete',
      });
    }

    const result = await Message.deleteMany({ _id: { $in: ids } });

    res.json({
      success: true,
      message: `${result.deletedCount} messages deleted successfully`,
      data: { deletedCount: result.deletedCount },
    });
  } catch (error) {
    next(error);
  }
};
