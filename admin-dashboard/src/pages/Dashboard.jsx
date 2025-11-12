import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFolder, FiStar, FiMail, FiTrendingUp, FiPlus } from 'react-icons/fi';
import { projectsAPI, skillsAPI, messagesAPI, handleAPIError } from '../utils/api';
import { format } from 'date-fns';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    unreadMessages: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const [projectsRes, skillsRes, messagesRes] = await Promise.all([
        projectsAPI.getAll({ limit: 1 }),
        skillsAPI.getAll(),
        messagesAPI.getAll({ limit: 5, sort: '-createdAt' }),
      ]);

      setStats({
        projects: projectsRes.data.total || 0,
        skills: skillsRes.data.count || 0,
        unreadMessages: messagesRes.data.statusCounts?.unread || 0,
      });

      setRecentMessages(messagesRes.data.data || []);
    } catch (error) {
      handleAPIError(error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FiFolder,
      color: 'from-electric-blue to-blue-600',
      link: '/projects',
    },
    {
      title: 'Total Skills',
      value: stats.skills,
      icon: FiStar,
      color: 'from-neon-pink to-pink-600',
      link: '/skills',
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      icon: FiMail,
      color: 'from-purple-500 to-indigo-600',
      link: '/messages',
    },
    {
      title: 'Activity',
      value: '↑ 12%',
      icon: FiTrendingUp,
      color: 'from-green-500 to-emerald-600',
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      unread: 'badge-info',
      read: 'badge-success',
      replied: 'badge-success',
      archived: 'badge-warning',
    };
    return badges[status] || 'badge-info';
  };

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
            Dashboard Overview
          </h1>
          <p className="text-gray-400">
            Welcome back! Here's what's happening with your portfolio.
          </p>
        </div>

        <Link
          to="/projects/new"
          className="btn-primary inline-flex items-center gap-2 justify-center sm:justify-start"
        >
          <FiPlus />
          New Project
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            to={stat.link || '#'}
            className={`stat-card ${!stat.link && 'pointer-events-none'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-white">
            Recent Messages
          </h2>
          <Link
            to="/messages"
            className="text-sm text-electric-blue hover:text-neon-pink transition-colors"
          >
            View All →
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <FiMail className="mx-auto mb-4" size={48} />
            <p>No messages yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <Link
                key={message._id}
                to="/messages"
                className="block p-4 rounded-lg glass-card hover:bg-white/5 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white truncate">
                        {message.name}
                      </h3>
                      <span className={`badge ${getStatusBadge(message.status)}`}>
                        {message.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{message.email}</p>
                    <p className="text-sm font-medium text-white mb-2">
                      {message.subject}
                    </p>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {message.message}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {format(new Date(message.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/projects/new"
          className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all group"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-electric-blue to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FiPlus className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white">Add Project</h3>
          </div>
          <p className="text-sm text-gray-400">
            Create a new project showcase
          </p>
        </Link>

        <Link
          to="/skills"
          className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all group"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-neon-pink to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FiStar className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white">Manage Skills</h3>
          </div>
          <p className="text-sm text-gray-400">
            Update your skills and expertise
          </p>
        </Link>

        <Link
          to="/messages"
          className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-all group"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FiMail className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white">View Messages</h3>
          </div>
          <p className="text-sm text-gray-400">
            Check and reply to messages
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
