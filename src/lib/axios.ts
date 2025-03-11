import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  withCredentials: true, // Garante que cookies de autenticação sejam enviados
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;