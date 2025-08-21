import api_handler from './api.js';

export const getItemsQuantity = async () => {
    try {
        const response = await api_handler.get('/api/inventory/');
        const inventory = response.map((item) => ({
            ...item,
            unit_price: parseFloat(item?.unit_price),
            is_available: item.quantity > 0,
        }));
        return inventory;
    } catch (error) {
        const errorMessage =
            error.message ||
            'Неизвестная ошибка при получении инвентаря';
        return Promise.reject(errorMessage);
    } finally {
        console.log('Была произведена отправка GET-запроса');
    }
};

export const setReservedItems = async (itemObject) => {
    try {
        const request = await api_handler.post('/api/reserve/', {
            items: itemObject,
        });
        return request;
    } catch (error) {
        return Promise.reject(error.message);
    }
};
