import axios from 'axios';

const api_handler = axios.create({
    baseURL: import.meta.env.VITE_DJANGO_API_URL,
    headers: { 'X-API-KEY': import.meta.env.VITE_X_API_KEY },
});

export default api_handler;
