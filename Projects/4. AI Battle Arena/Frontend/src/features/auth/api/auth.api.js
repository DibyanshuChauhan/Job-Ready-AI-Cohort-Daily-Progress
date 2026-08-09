import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
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
    window.location.href = 'http://localhost:3000/auth/google';
  },
};
