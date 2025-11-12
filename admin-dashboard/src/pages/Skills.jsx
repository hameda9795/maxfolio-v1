import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import { skillsAPI, handleAPIError } from '../utils/api';
import toast from 'react-hot-toast';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend',
    level: 80,
    icon: '',
    color: '#0FF4C6',
    years: 1,
    description: '',
    featured: false,
    published: true,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await skillsAPI.getAll();
      setSkills(response.data.data || []);
    } catch (error) {
      handleAPIError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingSkill) {
        await skillsAPI.update(editingSkill._id, formData);
        toast.success('Skill updated successfully!');
      } else {
        await skillsAPI.create(formData);
        toast.success('Skill created successfully!');
      }
      resetForm();
      fetchSkills();
    } catch (error) {
      handleAPIError(error);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData(skill);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      await skillsAPI.delete(id);
      toast.success('Skill deleted successfully');
      fetchSkills();
    } catch (error) {
      handleAPIError(error);
    }
  };

  const resetForm = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'frontend',
      level: 80,
      icon: '',
      color: '#0FF4C6',
      years: 1,
      description: '',
      featured: false,
      published: true,
    });
    setIsModalOpen(false);
  };

  const categories = ['frontend', 'backend', 'tools', 'design'];
  const skillsByCategory = categories.reduce((acc, category) => {
    acc[category] = skills.filter((s) => s.category === category);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text mb-2">
            Skills
          </h1>
          <p className="text-gray-400">Manage your skills and expertise</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary inline-flex items-center gap-2"
        >
          <FiPlus />
          Add Skill
        </button>
      </div>

      {/* Skills by Category */}
      {categories.map((category) => (
        <div key={category} className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6 capitalize">
            {category}
          </h2>

          {skillsByCategory[category].length === 0 ? (
            <p className="text-gray-400 text-center py-8">No skills in this category</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillsByCategory[category].map((skill) => (
                <div key={skill._id} className="glass-card rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{skill.name}</h3>
                      <p className="text-xs text-gray-400">
                        {skill.years} {skill.years === 1 ? 'year' : 'years'} experience
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {skill.featured && (
                        <span className="badge badge-info text-xs">Featured</span>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Level</span>
                      <span className="text-sm font-semibold text-white">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-electric-blue to-neon-pink transition-all"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-2"
                    >
                      <FiEdit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(skill._id)}
                      className="px-3 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 transition-colors"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-white">
                {editingSkill ? 'Edit Skill' : 'Add Skill'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-white">
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Skill Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="React, Node.js, etc."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="tools">Tools</option>
                    <option value="design">Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Level (0-100) *
                  </label>
                  <input
                    type="number"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                    className="input-field"
                    min="0"
                    max="100"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={formData.years}
                    onChange={(e) => setFormData({ ...formData, years: parseInt(e.target.value) })}
                    className="input-field"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Color
                  </label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="input-field h-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field min-h-[80px]"
                  placeholder="Brief description..."
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span className="text-gray-300">Featured</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span className="text-gray-300">Published</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex items-center gap-2 flex-1">
                  <FiSave />
                  {editingSkill ? 'Update' : 'Create'} Skill
                </button>
                <button type="button" onClick={resetForm} className="btn-secondary flex items-center gap-2">
                  <FiX />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
