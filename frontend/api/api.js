import axios from 'axios';

const apiHandler = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

export default apiHandler;
