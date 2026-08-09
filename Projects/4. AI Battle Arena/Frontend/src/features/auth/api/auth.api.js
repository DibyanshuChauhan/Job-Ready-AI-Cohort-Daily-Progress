import axios from 'axios';

// Shared axios client — mirrors arena.api.js pattern
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,  // sends the httpOnly JWT cookie automatically
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export const authApi = {
  // POST /api/v1/auth/register
  async register(email, password, displayName) {
    const response = await apiClient.post('/auth/register', {
      email,
      password,
      displayName,
    });
    return response.data.result;
  },

  // POST /api/v1/auth/login
  async login(email, password) {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data.result;
  },

  // GET /api/v1/auth/me — hydrate user from JWT cookie on page load
  async me() {
    const response = await apiClient.get('/auth/me');
    return response.data.result;
  },

  // POST /api/v1/auth/logout — clears httpOnly cookie server-side
  async logout() {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  // Redirect browser to Google OAuth flow
  redirectToGoogle() {
    window.location.href = 'http://localhost:3000/auth/google';
  },
};
