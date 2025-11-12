import axios from 'axios';

// Set base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const aboutAPI = {
  getAll: () => api.get('/about'),
  getHero: () => api.get('/about/hero'),
  getNavigation: () => api.get('/about/navigation'),
  getFooter: () => api.get('/about/footer'),
};

export const projectsAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getOne: (slug) => api.get(`/projects/${slug}`),
};

export const skillsAPI = {
  getAll: (params) => api.get('/skills', { params }),
};

export const messagesAPI = {
  create: (data) => api.post('/messages', data),
};

// Error handler helper
export const handleAPIError = (error) => {
  if (error.response) {
    console.error('API Error:', error.response.data);
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    console.error('Network Error:', error.request);
    return 'Network error. Please check your connection.';
  } else {
    console.error('Error:', error.message);
    return error.message;
  }
};

export default api;
