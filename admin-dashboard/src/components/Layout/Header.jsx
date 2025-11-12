import { FiMenu, FiLogOut, FiBell } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="glass-card h-16 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-400 hover:text-white transition-colors"
        >
          <FiMenu size={24} />
        </button>

        <h2 className="text-xl font-display font-bold text-white hidden sm:block">
          Portfolio Dashboard
        </h2>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <FiBell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-neon-pink rounded-full" />
        </button>

        {/* User Info */}
        <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-lg glass-card">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-electric-blue to-neon-pink flex items-center justify-center text-white font-bold text-sm">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {user?.username}
            </p>
            <p className="text-xs text-gray-400">
              {user?.role}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
          title="Logout"
        >
          <FiLogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
