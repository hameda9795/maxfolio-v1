import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiSave, FiLock } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, updatePassword } = useAuth();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    const result = await updatePassword(
      passwordData.currentPassword,
      passwordData.newPassword
    );

    if (result.success) {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold gradient-text mb-2">
          Settings
        </h1>
        <p className="text-gray-400">Manage your account settings</p>
      </div>

      {/* User Info */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Account Information</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-electric-blue to-neon-pink flex items-center justify-center text-white font-bold text-2xl">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{user?.username}</h3>
              <p className="text-gray-400">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-electric-blue/20 to-neon-pink/20 text-electric-blue">
                {user?.role?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <FiLock className="text-electric-blue" size={24} />
          <h2 className="text-xl font-semibold text-white">Change Password</h2>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, currentPassword: e.target.value })
              }
              className="input-field"
              placeholder="Enter current password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, newPassword: e.target.value })
              }
              className="input-field"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
              }
              className="input-field"
              placeholder="Confirm new password"
              required
            />
          </div>

          <div className="text-xs text-gray-400">
            <p className="mb-1">Password must:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Be at least 8 characters long</li>
              <li>Contain at least one uppercase letter</li>
              <li>Contain at least one lowercase letter</li>
              <li>Contain at least one number</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <FiSave />
                Update Password
              </>
            )}
          </button>
        </form>
      </div>

      {/* API Information */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">API Information</h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400 mb-2">Backend API URL</p>
            <code className="block px-4 py-3 rounded-lg glass-card text-electric-blue font-mono text-sm">
              {import.meta.env.VITE_API_URL || 'http://localhost:5000'}
            </code>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-2">Frontend URL</p>
            <code className="block px-4 py-3 rounded-lg glass-card text-electric-blue font-mono text-sm">
              {window.location.origin}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
