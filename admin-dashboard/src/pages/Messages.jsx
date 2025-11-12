import { useState, useEffect } from 'react';
import { FiMail, FiStar, FiTrash2, FiSend, FiX } from 'react-icons/fi';
import { messagesAPI, handleAPIError } from '../utils/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const fetchMessages = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await messagesAPI.getAll(params);
      setMessages(response.data.data || []);
    } catch (error) {
      handleAPIError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStar = async (id) => {
    try {
      await messagesAPI.toggleStar(id);
      fetchMessages();
      if (selectedMessage?._id === id) {
        setSelectedMessage({ ...selectedMessage, isStarred: !selectedMessage.isStarred });
      }
    } catch (error) {
      handleAPIError(error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await messagesAPI.update(id, { status });
      toast.success('Status updated');
      fetchMessages();
      if (selectedMessage?._id === id) {
        setSelectedMessage({ ...selectedMessage, status });
      }
    } catch (error) {
      handleAPIError(error);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setSending(true);
    try {
      await messagesAPI.reply(selectedMessage._id, replyText);
      toast.success('Reply sent successfully!');
      setReplyText('');
      setSelectedMessage(null);
      fetchMessages();
    } catch (error) {
      handleAPIError(error);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await messagesAPI.delete(id);
      toast.success('Message deleted');
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
      fetchMessages();
    } catch (error) {
      handleAPIError(error);
    }
  };

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
      <div>
        <h1 className="text-3xl font-display font-bold gradient-text mb-2">
          Messages
        </h1>
        <p className="text-gray-400">Manage and reply to contact messages</p>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex flex-wrap gap-2">
          {['all', 'unread', 'read', 'replied', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition-all capitalize ${
                filter === status
                  ? 'bg-gradient-to-r from-electric-blue to-neon-pink text-white'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      {messages.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <FiMail className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">No Messages</h3>
          <p className="text-gray-400">No messages in this category</p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr
                    key={message._id}
                    className={`cursor-pointer ${
                      selectedMessage?._id === message._id ? 'bg-white/10' : ''
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <td>
                      <div>
                        <div className="flex items-center gap-2">
                          {message.isStarred && (
                            <FiStar className="text-yellow-400" size={14} />
                          )}
                          <span className="font-semibold text-white">{message.name}</span>
                        </div>
                        <span className="text-sm text-gray-400">{message.email}</span>
                      </div>
                    </td>
                    <td className="text-white">{message.subject}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(message.status)}`}>
                        {message.status}
                      </span>
                    </td>
                    <td className="text-gray-400">
                      {format(new Date(message.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td>
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleToggleStar(message._id)}
                          className="text-gray-400 hover:text-yellow-400 transition-colors"
                        >
                          <FiStar className={message.isStarred ? 'fill-current text-yellow-400' : ''} size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(message._id)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
          <div className="modal-content max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-white">
                Message Details
              </h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Message Info */}
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">From</p>
                    <p className="text-white font-semibold">{selectedMessage.name}</p>
                    <p className="text-sm text-gray-400">{selectedMessage.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Date</p>
                    <p className="text-white">
                      {format(new Date(selectedMessage.createdAt), 'PPpp')}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-1">Subject</p>
                  <p className="text-white font-semibold">{selectedMessage.subject}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">Message</p>
                  <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-4">
                <span className="text-gray-400">Status:</span>
                <select
                  value={selectedMessage.status}
                  onChange={(e) => handleStatusChange(selectedMessage._id, e.target.value)}
                  className="input-field flex-1"
                >
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Reply Form */}
              {selectedMessage.status !== 'replied' && (
                <form onSubmit={handleReply} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Reply
                    </label>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="input-field min-h-[150px]"
                      placeholder="Type your reply..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50"
                  >
                    {sending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend />
                        Send Reply
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Already Replied */}
              {selectedMessage.reply && (
                <div className="glass-card rounded-xl p-4 border-l-4 border-electric-blue">
                  <p className="text-sm text-gray-400 mb-2">Your Reply:</p>
                  <p className="text-white whitespace-pre-wrap">{selectedMessage.reply.content}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Sent on {format(new Date(selectedMessage.reply.sentAt), 'PPpp')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
