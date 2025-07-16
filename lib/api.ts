// lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7000/api', // Your backend base URL
});

// ✅ Add token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
