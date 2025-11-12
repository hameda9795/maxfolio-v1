import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi';
import { projectsAPI, handleAPIError } from '../utils/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProjects();
  }, [filter, search]);

  const fetchProjects = async () => {
    try {
      const params = {
        ...(filter !== 'all' && { category: filter }),
        ...(search && { search }),
      };
      const response = await projectsAPI.getAll(params);
      setProjects(response.data.data || []);
    } catch (error) {
      handleAPIError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsAPI.delete(id);
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      handleAPIError(error);
    }
  };

  const categories = ['all', 'web', 'mobile', 'design', '3d', 'other'];

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
            Projects
          </h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>

        <Link to="/projects/new" className="btn-primary inline-flex items-center gap-2">
          <FiPlus />
          New Project
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filter === category
                    ? 'bg-gradient-to-r from-electric-blue to-neon-pink text-white'
                    : 'glass-card text-gray-400 hover:text-white'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="input-field flex-1"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <FiPlus className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">No Projects Found</h3>
          <p className="text-gray-400 mb-6">Get started by creating your first project</p>
          <Link to="/projects/new" className="btn-primary inline-flex items-center gap-2">
            <FiPlus />
            Create Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="glass-card rounded-2xl overflow-hidden group">
              {/* Image */}
              {project.hero?.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.hero.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className={`badge ${project.published ? 'badge-success' : 'badge-warning'}`}>
                      {project.published ? 'Published' : 'Draft'}
                    </span>
                    {project.featured && (
                      <span className="badge badge-info">Featured</span>
                    )}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <span className="badge badge-info mb-3">{project.category}</span>
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {project.subtitle}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{project.year}</span>
                  <span>{format(new Date(project.createdAt), 'MMM d, yyyy')}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-secondary text-center inline-flex items-center justify-center gap-2"
                    >
                      <FiExternalLink size={16} />
                      View
                    </a>
                  )}
                  <Link
                    to={`/projects/edit/${project._id}`}
                    className="flex-1 btn-secondary text-center inline-flex items-center justify-center gap-2"
                  >
                    <FiEdit2 size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
