/**
 * Utility class for price calculations including rental and item pricing
 */
class BookingPriceUtils {
    /**
     * Calculates rental price based on time duration
     * @param {number} timeRange - Number an hours between endTime and startTime
     * @param {number} [pricePer30=500] - Price per 30 minutes
     * @returns {number} Total rental price
     */
    static calculateRentDate(timeRange, pricePer30 = 500) {
        const totalPrice = timeRange * 2 * pricePer30;
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
            totalPrice += item.quantity * item.unitPrice;
        }
        return totalPrice;
    }

    /**
     * Calculates total price including rental and items
     * @param {Array} items - Array of item objects
     * @param {number} timeRange - Number an hours between endTime and startTime
     * @param {number} [pricePer30=500] - Price per 30 minutes
     * @returns {number} Total combined price
     */
    static calculateTotalPrice(items, timeRange, pricePer30) {
        const itemsPrice = this.calculateItemsPrice(items);
        const basePrice = this.calculateRentDate(timeRange, pricePer30);
        return itemsPrice + basePrice;
    }
}

export default BookingPriceUtils;
