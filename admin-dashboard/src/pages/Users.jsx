import { useState } from 'react';
import { FiUserPlus, FiX, FiSave } from 'react-icons/fi';
import { usersAPI, handleAPIError } from '../utils/api';
import toast from 'react-hot-toast';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'editor',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await usersAPI.register(formData);
      toast.success('User created successfully!');
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'editor',
      });
      setIsModalOpen(false);
    } catch (error) {
      handleAPIError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text mb-2">
            User Management
          </h1>
          <p className="text-gray-400">Manage admin and editor accounts</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary inline-flex items-center gap-2"
        >
          <FiUserPlus />
          Add User
        </button>
      </div>

      {/* Info Card */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">About User Roles</h2>
        <div className="space-y-3 text-gray-300">
          <div>
            <span className="font-semibold text-electric-blue">Admin:</span> Full access to
            all features including user management, bulk operations, and system settings.
          </div>
          <div>
            <span className="font-semibold text-neon-pink">Editor:</span> Can manage
            projects, skills, and messages. Cannot create/delete users or perform bulk
            operations.
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-white">Create New User</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="input-field"
                  placeholder="Username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  placeholder="user@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-field"
                  placeholder="Minimum 8 characters"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Role *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="input-field"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="text-xs text-gray-400">
                <p className="mb-1">Password requirements:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Minimum 8 characters</li>
                  <li>At least one uppercase letter</li>
                  <li>At least one lowercase letter</li>
                  <li>At least one number</li>
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center gap-2 flex-1 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <FiSave />
                      Create User
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary flex items-center gap-2"
                >
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

export default Users;
