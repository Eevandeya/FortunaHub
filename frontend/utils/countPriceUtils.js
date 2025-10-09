/**
 * Utility class for price calculations including rental and item pricing
 */
class CountPriceUtils {
    /**
     * Calculates rental price based on time duration
     * @param {Object} dates - Date range object
     * @param {Date} dates.start - Rental start time
     * @param {Date} dates.end - Rental end time
     * @param {number} [price_per_30=500] - Price per 30 minutes
     * @returns {number} Total rental price
     */
    static calculateRentDate(dates, price_per_30 = 500) {
        const start_time = dates.start;
        const end_time = dates.end;
        const total_price =
            (Math.abs(end_time - start_time) / (30 * 60 * 1000)) * price_per_30;
        return total_price;
    }

    /**
     * Calculates total price for items
     * @param {Array} items - Array of item objects
     * @returns {number} Total items price
     * @throws {Error} If items data is invalid
     */
    static calculateItemsPrice(items) {
        let total_price = 0;
        if (!Array.isArray(items)) {
            throw new Error('Incorrect data about items');
        }
        for (const item of items) {
            total_price += item.quantity * item.unit_price;
        }
        return total_price;
    }

    /**
     * Calculates total price including rental and items
     * @param {Array} items - Array of item objects
     * @param {Object} dates - Date range object
     * @param {number} [price_per_30=500] - Price per 30 minutes
     * @returns {number} Total combined price
     */
    static calculateTotalPrice(items, dates, price_per_30) {
        const items_price = this.calculateItemsPrice(items);
        const base_price = this.calculateRentDate(dates, price_per_30);
        return items_price + base_price;
    }
}

export default CountPriceUtils;
