import baseApi from './api.js';

/**
 * Inventory API extension with query endpoints for inventory management
 * Extends the base API with inventory-specific functionality
 *
 * @namespace inventoryApi
 * @extends baseApi
 */
export const inventoryApi = baseApi.injectEndpoints({
    /**
     * @name endpoints
     * @type {Function}
     * @param {import('@reduxjs/toolkit/query').Builder} build - RTK Query builder instance
     * @returns {Object} Endpoints configuration object
     * @description Defines inventory-related API endpoints
     */
    endpoints: (build) => ({
        /**
         * Fetches inventory items with quantity information.
         * Retrieves and transforms inventory data from the backend
         *
         * @method getItemsQuantity
         * @type {import('@reduxjs/toolkit/query').QueryDefinition}
         * @returns {Promise<InventoryItem[]>} Promise resolving to transformed inventory items
         */
        getItemsQuantity: build.query({
            /**
             * @name query
             * @type {Function}
             * @returns {Object} Fetch API configuration object
             * @description Constructs the HTTP request for inventory data
             */
            query: () => 'inventory/',
            /**
             * @name providesTags
             * @type {Array<string>}
             * @description Tags that this query provides for cache management
             * Allows invalidation when bookings are created/updated
             */
            providesTags: ['Booking'],
            transformResponse: (response) => {
                if (!Array.isArray(response)) {
                    throw new Error('Inventory data must be an array');
                }

                if (
                    !response.every(
                        (item) =>
                            typeof item === 'object' &&
                            item !== null &&
                            !Array.isArray(item)
                    )
                ) {
                    throw new Error('Invalid inventory data');
                }
                return response.map((item) => ({
                    ...item,

                    unitPrice: parseFloat(item?.unit_price || 0),
                    isAvailable: item.quantity > 0,
                }));
            },
        }),
    }),
    /**
     * @name overrideExisting
     * @type {boolean}
     * @description Allows overriding existing endpoints with the same name
     * Useful for development and testing when endpoints need to be redefined
     */
    overrideExisting: true,
});

export const { useGetItemsQuantityQuery } = inventoryApi;
