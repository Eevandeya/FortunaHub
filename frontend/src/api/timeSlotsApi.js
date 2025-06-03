import time_handler from './api.js';

export const getAvailableTimes = async (date) => {
  try {
    const time_response = await time_handler
      .get('/api/available_time/', {
        params: {
          date: date, // Передаем дату в URL для поиска времени по дате
        },
      })
      .then((response) => response['0']?.free_time ?? [])
      .catch((error) => {
        console.log(`Ошибка в timeSlotsApi ${error}`);
        //return Promise.reject(error.message)
      });

    return time_response;
  } catch (error) {
    console.log('Bad api request. Error: ', error.message);
    return Promise.reject(error.message);
  } finally {
    console.log('Была произведена отправка GET-запроса');
  }
};

export const setTime = async (chosen_date, chosen_time) => {
  try {
    const request = await time_handler.post(
      '/api/chosen_time/',
      {
        time: chosen_time,
        date: chosen_date,
      },
      {
        headers: {
          'Content-Type': 'application/json', // Если отправляете JSON. Благодаря этому загаловку сервер будет парсить как данные как JSON.
        },
      }
    );
    return request;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
