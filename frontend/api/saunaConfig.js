import time_handler from './api.js';

export default async function getSaunaConfig() {
  try {
    const sauna_config_info = await time_handler.get('/api/config');

    return sauna_config_info;
  } catch (error) {
    return Promise.reject(error.message);
  }
}
