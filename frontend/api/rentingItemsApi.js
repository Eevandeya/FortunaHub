import baseApi from './api.js';

export const inventoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getItemsQuantity: build.query({
            query: () => 'inventory/',
            providesTags: ['Booking'],
            transformResponse: (response) => {
                if (!Array.isArray(response)) {
                    throw new Error('Данные инвентаря должны быть массивом');
                }

                if (
                    !response.every(
                        (item) =>
                            typeof item === 'object' &&
                            item !== null &&
                            !Array.isArray(item)
                    )
                ) {
                    throw new Error('Неверные данные в инвентаре');
                }

                // Трансформация данных
                return response.map((item) => ({
                    ...item,

                    unitPrice: parseFloat(item?.unit_price || 0),
                    isAvailable: item.quantity > 0,
                }));
            },
        }),
    }),
    overrideExisting: true,
});

export const { useGetItemsQuantityQuery } = inventoryApi;
