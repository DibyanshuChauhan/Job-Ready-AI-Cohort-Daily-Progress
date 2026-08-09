import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://job-ready-ai-cohort-daily-progress-2.onrender.com/api/v1';

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  'https://job-ready-ai-cohort-daily-progress-2.onrender.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export const authApi = {
  async register(email, password, displayName) {
    const response = await apiClient.post('/auth/register', {
      email,
      password,
      displayName,
    });
    return response.data.result;
  },

  async login(email, password) {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data.result;
  },

  async me() {
    const response = await apiClient.get('/auth/me');
    return response.data.result;
  },

  async logout() {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  redirectToGoogle() {
    window.location.href = `${BACKEND_URL}/auth/google`;
  },
};
