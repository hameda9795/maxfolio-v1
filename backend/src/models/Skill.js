const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a skill name'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['frontend', 'backend', 'tools', 'design'],
  },
  level: {
    type: Number,
    required: [true, 'Please provide a skill level (0-100)'],
    min: 0,
    max: 100,
  },
  icon: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    default: '#0FF4C6',
  },
  years: {
    type: Number,
    min: 0,
  },
  description: String,
  order: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field on save
skillSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Skill', skillSchema);
