import apiHandler from './api.js';

/**
 * Fetches inventory items with their quantities and converts unit prices to numbers
 * @returns {Promise<Array>} Promise resolving to array of inventory items with numeric unit prices
 * @throws {Promise<string>} Promise rejecting with error message if request fails
 * @example
 * // Get inventory items
 * getItemsQuantity()
 *   .then(items => console.log('Inventory:', items))
 *   .catch(error => console.error('Error:', error));
 */
export const getItemsQuantity = async () => {
    try {
        const response = await apiHandler.get('/api/inventory/');

        const inventory = response.data?.map((item) => ({
            ...item,
            unitPrice: parseFloat(item?.unit_price),
        }));
        return inventory;
    } catch (error) {
        const errorMessage =
            error.message || 'Unknown error while retrieving inventory';
        return Promise.reject(errorMessage);
    } finally {
        // eslint-disable-next-line
        console.log('A GET request was sent');
    }
};
