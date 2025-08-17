import axios from 'axios';

const getCSRFToken = () => {
  return document.cookie.match(/csrftoken=[^;]*/)?.[1];
};

const time_handler = axios.create({
  //создали кастомный axios
  baseURL: import.meta.env.VITE_DJANGO_API_URL, // Берем URL из файла. Позволяет указывать только путь
});

time_handler.interceptors.request.use(
  function (config) {
    const method = config.method?.toLowerCase() || '';
    try {
      if (method === '') {
        throw new Error('Не определенно имя метода запрос');
      }
      if (['post', 'put', 'delete'].includes(method)) {
        const token = getCSRFToken();
        if (token) {
          config.headers['X-CSRFToken'] = getCSRFToken();
        } else {
          console.error('CRSF-токен не найден');
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
    return config; //Каждый request должен возвращать config
  },
  function (error) {
    return Promise.reject(error);
  }
);

time_handler.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    const status = error.response?.status;
    if (status === 404) {
      console.log('Неверный путь');
    }
    if (status === 401) {
      console.log('Устаревший токен');
      //FIXME: Нужно проверять на валдиность токен и если его время истекло, обновлять
      //TODO: Решить проблему с другими ошибками.
    }
    if (status === 416) {
      console.error('Ошибка проверки CRSF-токена');
    }
    if (status === 400) {
      console.error('Bad request');
    }
    return Promise.reject(error); // Пробрасываем ошибку дальше
  }
);

export default time_handler;
