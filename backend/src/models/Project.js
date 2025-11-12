const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  subtitle: {
    type: String,
    required: [true, 'Please provide a subtitle'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['web', 'mobile', 'design', '3d', 'other'],
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    default: 'medium',
  },
  year: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  timeline: String,
  client: String,

  // Hero Section
  hero: {
    image: String,
    alt: String,
  },

  // Overview Section
  overview: {
    description: String,
    challenge: String,
    solution: String,
    impact: String,
  },

  // Technologies
  technologies: {
    frontend: [String],
    backend: [String],
    tools: [String],
  },

  // Metrics
  metrics: [{
    label: String,
    value: Number,
    suffix: String,
    description: String,
    icon: String,
  }],

  // Features
  features: [{
    title: String,
    description: String,
    icon: String,
  }],

  // Process/Workflow
  process: [{
    phase: String,
    title: String,
    description: String,
    icon: String,
  }],

  // Gallery
  gallery: [{
    type: {
      type: String,
      enum: ['desktop', 'mobile', 'other'],
    },
    url: String,
    alt: String,
    caption: String,
  }],

  // Code Snippets
  codeSnippets: [{
    title: String,
    language: String,
    code: String,
  }],

  // Learnings
  learnings: [{
    category: String,
    title: String,
    description: String,
  }],

  // Testimonials
  testimonials: [{
    name: String,
    role: String,
    company: String,
    avatar: String,
    quote: String,
  }],

  // Links
  links: {
    live: String,
    github: String,
    figma: String,
  },

  // Status
  featured: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: true,
  },

  // Metadata
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
projectSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Generate slug from title if not provided
projectSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema);
