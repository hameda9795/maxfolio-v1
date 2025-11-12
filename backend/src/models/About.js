const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  // Hero Section
  hero: {
    name: {
      type: String,
      default: 'John Doe',
    },
    title: {
      type: String,
      default: 'Full Stack Developer',
    },
    subtitle: {
      type: String,
      default: 'Creative Developer & Designer',
    },
    description: {
      type: String,
      default: 'Crafting exceptional digital experiences with code and creativity',
    },
    ctaText: {
      type: String,
      default: 'View My Work',
    },
    resumeUrl: String,
  },

  // About Section
  about: {
    title: {
      type: String,
      default: 'About Me',
    },
    description: String,
    image: String,
    stats: [
      {
        label: String,
        value: String,
      },
    ],
    timeline: [
      {
        year: String,
        title: String,
        company: String,
        description: String,
        icon: String,
      },
    ],
  },

  // Navigation
  navigation: {
    logo: {
      type: String,
      default: 'Portfolio',
    },
    links: [
      {
        label: String,
        href: String,
        order: Number,
      },
    ],
  },

  // Footer
  footer: {
    tagline: {
      type: String,
      default: "Let's create something amazing together",
    },
    copyright: {
      type: String,
      default: '© 2024 All rights reserved',
    },
    socialLinks: [
      {
        platform: String,
        url: String,
        icon: String,
      },
    ],
    quickLinks: [
      {
        label: String,
        href: String,
      },
    ],
  },

  // Contact Info
  contact: {
    email: String,
    phone: String,
    location: String,
    availability: {
      type: String,
      default: 'Available for freelance work',
    },
  },

  // SEO
  seo: {
    title: {
      type: String,
      default: 'Portfolio - Full Stack Developer',
    },
    description: String,
    keywords: [String],
    ogImage: String,
  },

  // Settings
  isActive: {
    type: Boolean,
    default: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field on save
aboutSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('About', aboutSchema);
