import axios from 'axios';
import toast from 'react-hot-toast';

// Set base URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Add token to requests automatically
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Projects API
export const projectsAPI = {
  getAll: (params) => axios.get('/api/projects', { params }),
  getOne: (slug) => axios.get(`/api/projects/${slug}`),
  create: (data) => axios.post('/api/projects', data),
  update: (id, data) => axios.put(`/api/projects/${id}`, data),
  delete: (id) => axios.delete(`/api/projects/${id}`),
  bulkDelete: (ids) => axios.delete('/api/projects', { data: { ids } }),
};

// Skills API
export const skillsAPI = {
  getAll: (params) => axios.get('/api/skills', { params }),
  getOne: (id) => axios.get(`/api/skills/${id}`),
  create: (data) => axios.post('/api/skills', data),
  update: (id, data) => axios.put(`/api/skills/${id}`, data),
  delete: (id) => axios.delete(`/api/skills/${id}`),
  reorder: (skills) => axios.put('/api/skills/reorder', { skills }),
  bulkDelete: (ids) => axios.delete('/api/skills', { data: { ids } }),
};

// Messages API
export const messagesAPI = {
  getAll: (params) => axios.get('/api/messages', { params }),
  getOne: (id) => axios.get(`/api/messages/${id}`),
  update: (id, data) => axios.put(`/api/messages/${id}`, data),
  reply: (id, content) => axios.post(`/api/messages/${id}/reply`, { content }),
  toggleStar: (id) => axios.put(`/api/messages/${id}/star`),
  delete: (id) => axios.delete(`/api/messages/${id}`),
  bulkDelete: (ids) => axios.delete('/api/messages', { data: { ids } }),
};

// Users API (Admin only)
export const usersAPI = {
  register: (data) => axios.post('/api/auth/register', data),
};

// Helper function to handle API errors
export const handleAPIError = (error) => {
  const message = error.response?.data?.message || error.message || 'An error occurred';
  toast.error(message);
  console.error('API Error:', error);
  return message;
};

export default axios;
