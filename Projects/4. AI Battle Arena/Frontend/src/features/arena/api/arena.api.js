import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const arenaApi = {
  async invokeBattle(prompt, sessionId = null) {
    const response = await apiClient.post('/arena/invoke', { input: prompt, sessionId });
    return response.data.result;
  },

  async getHistory() {
    const response = await apiClient.get('/arena/history');
    return response.data.result || [];
  },

  async getHistoryById(id) {
    const response = await apiClient.get(`/arena/history/${id}`);
    return response.data.result;
  },

  async deleteHistory(id) {
    const response = await apiClient.delete(`/arena/history/${id}`);
    return response.data;
  },

  async clearAllHistory() {
    const response = await apiClient.delete('/arena/history');
    return response.data;
  },

  async checkHealth() {
    const response = await apiClient.get('/arena/health');
    return response.data;
  },
};
