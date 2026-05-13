import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const getHealthStatus = () => apiClient.get('/api/health');
export const getDBHealth = () => apiClient.get('/api/db-health');
export const getStatus = () => apiClient.get('/api/status');
export const getSampleUsers = () => apiClient.get('/api/sample-users');
export const getSystemInfo = () => apiClient.get('/api/system-info');

export default apiClient;
