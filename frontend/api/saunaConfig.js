import apiHandler from './api.js';

export async function getSaunaConfig() {
    try {
        const saunaConfigInfo = await apiHandler.get('/api/config/');
        return saunaConfigInfo;
    } catch (error) {
        return Promise.reject(new Error(error.message));
    }
}
