/**
 * Utility class for price calculations including rental and item pricing
 */
class CountPriceUtils {
    /**
     * Calculates rental price based on time duration
     * @param {Object} dates - Date range object
     * @param {number} [pricePer30=500] - Price per 30 minutes
     * @param {Date} dates.start - Rental start time
     * @param {Date} dates.end - Rental end time
     * @returns {number} Total rental price
     */
    static calculateRentDate(dates, pricePer30 = 500) {
        const startTime = dates.start;
        const endTime = dates.end;
        const totalPrice =
            (Math.abs(endTime - startTime) / (30 * 60 * 1000)) * pricePer30;
        return totalPrice;
    }

    /**
     * Calculates total price for items
     * @param {Array} items - Array of item objects
     * @returns {number} Total items price
     * @throws {Error} If items data is invalid
     */
    static calculateItemsPrice(items) {
        let totalPrice = 0;
        if (!Array.isArray(items)) {
            throw new Error('Incorrect data about items');
        }
        for (const item of items) {
            totalPrice += item.quantity * item.unit_price;
        }
        return totalPrice;
    }

    /**
     * Calculates total price including rental and items
     * @param {Array} items - Array of item objects
     * @param {Object} dates - Date range object
     * @param {number} [pricePer30=500] - Price per 30 minutes
     * @returns {number} Total combined price
     */
    static calculateTotalPrice(items, dates, pricePer30) {
        const itemsPrice = this.calculateItemsPrice(items);
        const basePrice = this.calculateRentDate(dates, pricePer30);
        return itemsPrice + basePrice;
    }
}

export default CountPriceUtils;
