import api_handler from './api.js';

export async function getSaunaConfig() {
    try {
        const sauna_config_info = await api_handler.get('/api/config/');
        return sauna_config_info;
    } catch (error) {
        return Promise.reject(new Error(error.message));
    }
}
