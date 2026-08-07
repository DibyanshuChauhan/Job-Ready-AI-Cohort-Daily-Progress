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
  /**
   * Invokes the parallel model battle and judge evaluation (v1 API).
   * @param {string} prompt
   */
  async invokeBattle(prompt) {
    const response = await apiClient.post('/arena/invoke', { input: prompt });
    return response.data.result;
  },

  /**
   * Retrieves past battle history from MongoDB (v1 API).
   */
  async getHistory() {
    const response = await apiClient.get('/arena/history');
    return response.data.result || [];
  },

  /**
   * Retrieves a specific past comparison by ID (v1 API).
   * @param {string} id
   */
  async getHistoryById(id) {
    const response = await apiClient.get(`/arena/history/${id}`);
    return response.data.result;
  },

  /**
   * Deletes a specific history record from MongoDB (v1 API).
   * @param {string} id
   */
  async deleteHistory(id) {
    const response = await apiClient.delete(`/arena/history/${id}`);
    return response.data;
  },

  /**
   * Clears all history records from MongoDB (v1 API).
   */
  async clearAllHistory() {
    const response = await apiClient.delete('/arena/history');
    return response.data;
  },

  /**
   * Health check for arena service (v1 API).
   */
  async checkHealth() {
    const response = await apiClient.get('/arena/health');
    return response.data;
  },
};
