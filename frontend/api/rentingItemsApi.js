import api_handler from './api.js';

export const getItemsQuantity = async () => {
    try {
        const response = await api_handler.get('/api/inventory/');

        const inventory = response.data?.map((item) => ({
            ...item,
            unit_price: parseFloat(item?.unit_price),
        }));
        return inventory;
    } catch (error) {
        const errorMessage =
            error.message || 'Неизвестная ошибка при получении инвентаря';
        return Promise.reject(errorMessage);
    } finally {
        console.log('Была произведена отправка GET-запроса');
    }
};
