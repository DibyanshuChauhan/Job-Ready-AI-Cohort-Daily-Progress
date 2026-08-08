import axios from 'axios';

// Base API client pointing to backend server
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,
  timeout: 60000, // 60s timeout for model processing
  headers: {
    'Content-Type': 'application/json',
  },
});

export const arenaApi = {
  // Send prompt to dual model battle engine. Pass sessionId to continue an active chat.
  async invokeBattle(prompt, sessionId = null) {
    const response = await apiClient.post('/arena/invoke', { input: prompt, sessionId });
    return response.data.result;
  },

  // Fetch past chat sessions from backend
  async getHistory() {
    const response = await apiClient.get('/arena/history');
    return response.data.result || [];
  },

  // Fetch single chat session by ID
  async getHistoryById(id) {
    const response = await apiClient.get(`/arena/history/${id}`);
    return response.data.result;
  },

  // Delete a specific session from history
  async deleteHistory(id) {
    const response = await apiClient.delete(`/arena/history/${id}`);
    return response.data;
  },

  // Delete all chat history
  async clearAllHistory() {
    const response = await apiClient.delete('/arena/history');
    return response.data;
  },

  // Health check endpoint
  async checkHealth() {
    const response = await apiClient.get('/arena/health');
    return response.data;
  },
};
