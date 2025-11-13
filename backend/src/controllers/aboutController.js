const About = require('../models/About');

// @desc    Get about content
// @route   GET /api/about
// @access  Public
exports.getAbout = async (req, res, next) => {
  try {
    let about = await About.findOne({ isActive: true });

    // If no about content exists, create default
    if (!about) {
      about = await About.create({});
    }

    res.json({
      success: true,
      data: about,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update about content
// @route   PUT /api/about
// @access  Private
exports.updateAbout = async (req, res, next) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = await About.create(req.body);
    } else {
      // Deep merge for nested objects
      about = await About.findByIdAndUpdate(
        about._id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
    }

    res.json({
      success: true,
      data: about,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get hero section
// @route   GET /api/about/hero
// @access  Public
exports.getHero = async (req, res, next) => {
  try {
    const about = await About.findOne({ isActive: true });

    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    res.json({
      success: true,
      data: about.hero,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get navigation
// @route   GET /api/about/navigation
// @access  Public
exports.getNavigation = async (req, res, next) => {
  try {
    const about = await About.findOne({ isActive: true });

    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    res.json({
      success: true,
      data: about.navigation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get footer
// @route   GET /api/about/footer
// @access  Public
exports.getFooter = async (req, res, next) => {
  try {
    const about = await About.findOne({ isActive: true });

    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    res.json({
      success: true,
      data: about.footer,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Seed default about content
// @route   POST /api/about/seed
// @access  Private (Admin only)
exports.seedAbout = async (req, res, next) => {
  try {
    const exists = await About.findOne();

    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'About content already exists',
      });
    }

    const defaultContent = {
      hero: {
        name: 'Hameda Developer',
        title: 'Full Stack Developer',
        subtitle: 'Creative Developer & Designer',
        description: 'Crafting exceptional digital experiences with modern web technologies',
        ctaText: 'View My Work',
      },
      about: {
        title: 'About Me',
        description: 'I am a passionate developer with expertise in building modern web applications.',
        stats: [
          { label: 'Years Experience', value: '5+' },
          { label: 'Projects Completed', value: '50+' },
          { label: 'Happy Clients', value: '30+' },
          { label: 'Technologies', value: '20+' },
        ],
        timeline: [
          {
            year: '2024',
            title: 'Senior Full Stack Developer',
            company: 'Tech Company',
            description: 'Leading development of enterprise applications',
            icon: 'briefcase',
          },
        ],
      },
      navigation: {
        logo: 'Portfolio',
        links: [
          { label: 'Home', href: '#home', order: 1 },
          { label: 'Projects', href: '#projects', order: 2 },
          { label: 'Skills', href: '#skills', order: 3 },
          { label: 'About', href: '#about', order: 4 },
          { label: 'Contact', href: '#contact', order: 5 },
        ],
      },
      footer: {
        tagline: "Let's create something amazing together",
        copyright: '© 2024 All rights reserved',
        socialLinks: [
          { platform: 'GitHub', url: 'https://github.com', icon: 'github' },
          { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
          { platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
        ],
        quickLinks: [
          { label: 'Home', href: '#home' },
          { label: 'Projects', href: '#projects' },
          { label: 'Contact', href: '#contact' },
        ],
      },
      contact: {
        email: 'hameda9795@gmail.com',
        phone: '+31 6 12345678',
        location: 'Netherlands',
        availability: 'Available for freelance work',
      },
      seo: {
        title: 'Hameda - Full Stack Developer Portfolio',
        description: 'Professional portfolio showcasing modern web development projects',
        keywords: ['web developer', 'full stack', 'react', 'nodejs', 'portfolio'],
      },
    };

    const about = await About.create(defaultContent);

    res.status(201).json({
      success: true,
      message: 'Default about content created',
      data: about,
    });
  } catch (error) {
    next(error);
  }
};
