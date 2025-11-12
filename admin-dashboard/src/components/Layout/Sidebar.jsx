import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiFolder,
  FiStar,
  FiMail,
  FiSettings,
  FiUsers,
  FiX,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/projects', icon: FiFolder, label: 'Projects' },
    { path: '/skills', icon: FiStar, label: 'Skills' },
    { path: '/messages', icon: FiMail, label: 'Messages' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
  ];

  // Add Users link for admin only
  if (user?.role === 'admin') {
    navItems.push({ path: '/users', icon: FiUsers, label: 'Users' });
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 glass-card z-50 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h1 className="text-2xl font-display font-bold gradient-text">
              Admin
            </h1>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-electric-blue/20 to-neon-pink/20 text-electric-blue'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-electric-blue to-neon-pink flex items-center justify-center text-white font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {user?.username}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
