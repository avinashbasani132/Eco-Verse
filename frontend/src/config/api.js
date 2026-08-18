// frontend/src/config/api.js
// Centralized API Base URL supporting local development and production deployment

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default API_BASE_URL;
