import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const arenaApi = {
  /**
   * Invokes the parallel model battle and judge evaluation.
   * @param {string} prompt
   * @returns {Promise<import('../arena.types').ArenaGraphResult>}
   */
  async invokeBattle(prompt) {
    const response = await apiClient.post('/arena/invoke', { input: prompt });
    return response.data.result;
  },

  /**
   * Health check for arena service
   */
  async checkHealth() {
    const response = await apiClient.get('/arena/health');
    return response.data;
  },
};
