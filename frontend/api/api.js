import axios from 'axios';

const api_handler = axios.create({
    //создали кастомный axios
    baseURL: import.meta.env.VITE_DJANGO_API_URL, // Берем URL из файла. Позволяет указывать только путь
    headers: { 'X-API-KEY': 'api-secret-key' },
});

export default api_handler;
