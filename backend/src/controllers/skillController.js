const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
exports.getSkills = async (req, res, next) => {
  try {
    const {
      category,
      featured,
      published,
      sort = 'order',
    } = req.query;

    // Build query
    const query = {};

    if (category) query.category = category;
    if (featured !== undefined) query.featured = featured === 'true';
    if (published !== undefined) query.published = published === 'true';

    // Execute query
    const skills = await Skill.find(query).sort(sort);

    res.json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single skill
// @route   GET /api/skills/:id
// @access  Public
exports.getSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found',
      });
    }

    res.json({
      success: true,
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private
exports.createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
exports.updateSkill = async (req, res, next) => {
  try {
    let skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found',
      });
    }

    skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: skill,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
exports.deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found',
      });
    }

    await skill.deleteOne();

    res.json({
      success: true,
      message: 'Skill deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk delete skills
// @route   DELETE /api/skills
// @access  Private (Admin only)
exports.bulkDeleteSkills = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide skill IDs to delete',
      });
    }

    const result = await Skill.deleteMany({ _id: { $in: ids } });

    res.json({
      success: true,
      message: `${result.deletedCount} skills deleted successfully`,
      data: { deletedCount: result.deletedCount },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update skill order
// @route   PUT /api/skills/reorder
// @access  Private
exports.reorderSkills = async (req, res, next) => {
  try {
    const { skills } = req.body; // Array of { id, order }

    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide skills array',
      });
    }

    // Update each skill's order
    const updatePromises = skills.map(({ id, order }) =>
      Skill.findByIdAndUpdate(id, { order }, { new: true })
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'Skills reordered successfully',
    });
  } catch (error) {
    next(error);
  }
};
