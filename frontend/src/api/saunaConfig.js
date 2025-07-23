import time_handler from './api.js';

export default async function getSaunaConfig() {
    const sauna_config_info
      = await time_handler.get('/api/config/').then(response => {
    const contentType = response.headers['content-type'];
    if (!contentType.includes('application/json')) {
        return Promise.reject(new Error('Неверный формат данных')); // Данные уже объект
    }
  }).catch(error => Promise.reject(error.message))
    return sauna_config_info;
}