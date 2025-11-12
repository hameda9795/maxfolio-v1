import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { projectsAPI, handleAPIError } from '../utils/api';
import toast from 'react-hot-toast';
import { FiSave, FiX, FiArrowLeft } from 'react-icons/fi';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await projectsAPI.getOne(id);
      reset(response.data.data);
    } catch (error) {
      handleAPIError(error);
      navigate('/projects');
    } finally {
      setInitialLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      if (isEdit) {
        await projectsAPI.update(id, data);
        toast.success('Project updated successfully!');
      } else {
        await projectsAPI.create(data);
        toast.success('Project created successfully!');
      }
      navigate('/projects');
    } catch (error) {
      handleAPIError(error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/projects" className="text-gray-400 hover:text-white transition-colors">
          <FiArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text mb-2">
            {isEdit ? 'Edit Project' : 'New Project'}
          </h1>
          <p className="text-gray-400">
            {isEdit ? 'Update project details' : 'Create a new project'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <div className="glass-card rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Title *
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                className="input-field"
                placeholder="Project Title"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Slug
              </label>
              <input
                {...register('slug')}
                className="input-field"
                placeholder="project-slug (auto-generated if empty)"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Subtitle *
            </label>
            <input
              {...register('subtitle', { required: 'Subtitle is required' })}
              className="input-field"
              placeholder="Brief description"
            />
            {errors.subtitle && (
              <p className="text-red-400 text-sm mt-1">{errors.subtitle.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Category *
              </label>
              <select {...register('category', { required: true })} className="input-field">
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
                <option value="design">Design</option>
                <option value="3d">3D</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Year *
              </label>
              <input
                type="number"
                {...register('year', { required: true, valueAsNumber: true })}
                className="input-field"
                placeholder="2024"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Size
              </label>
              <select {...register('size')} className="input-field">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Role *
              </label>
              <input
                {...register('role', { required: true })}
                className="input-field"
                placeholder="Full Stack Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Timeline
              </label>
              <input
                {...register('timeline')}
                className="input-field"
                placeholder="3 months"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Client
            </label>
            <input
              {...register('client')}
              className="input-field"
              placeholder="Client Name"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register('published')} className="w-5 h-5" />
              <span className="text-gray-300">Published</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register('featured')} className="w-5 h-5" />
              <span className="text-gray-300">Featured</span>
            </label>
          </div>
        </div>

        {/* Hero Section */}
        <div className="glass-card rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4">Hero Section</h2>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Hero Image URL
            </label>
            <input
              {...register('hero.image')}
              className="input-field"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Image Alt Text
            </label>
            <input
              {...register('hero.alt')}
              className="input-field"
              placeholder="Project screenshot"
            />
          </div>
        </div>

        {/* Overview Section */}
        <div className="glass-card rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Description
            </label>
            <textarea
              {...register('overview.description')}
              className="input-field min-h-[100px]"
              placeholder="Project description..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Challenge
            </label>
            <textarea
              {...register('overview.challenge')}
              className="input-field min-h-[100px]"
              placeholder="What challenges did you face..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Solution
            </label>
            <textarea
              {...register('overview.solution')}
              className="input-field min-h-[100px]"
              placeholder="How did you solve them..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Impact
            </label>
            <textarea
              {...register('overview.impact')}
              className="input-field min-h-[100px]"
              placeholder="What was the impact..."
            />
          </div>
        </div>

        {/* Links */}
        <div className="glass-card rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4">Links</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Live URL
              </label>
              <input
                {...register('links.live')}
                className="input-field"
                placeholder="https://project.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                GitHub URL
              </label>
              <input
                {...register('links.github')}
                className="input-field"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Figma URL
              </label>
              <input
                {...register('links.figma')}
                className="input-field"
                placeholder="https://figma.com/..."
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FiSave />
                {isEdit ? 'Update Project' : 'Create Project'}
              </>
            )}
          </button>

          <Link to="/projects" className="btn-secondary flex items-center gap-2">
            <FiX />
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
