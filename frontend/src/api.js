import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mern-notes-app-production-8ad4.up.railway.app/api',
});

export default api;