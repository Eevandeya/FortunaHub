/**
 * Utility class for price calculations including rental and item pricing
 */
class BookingPriceUtils {
    /**
     * Calculates rental price based on time duration
     * @param {number} timeRange - Number an hours between endTime and startTime
     * @param {number} [pricePerHour=500] - Price per one hour
     * @returns {number} Total rental price
     */
    static calculateRentDate(timeRange, pricePerHour = 500) {
        const totalPrice = timeRange * pricePerHour;
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
     * @param {number} [pricePerHour=500] - Price per one hour
     * @returns {number} Total combined price
     */
    static calculateTotalPrice(items, timeRange, pricePerHour) {
        const itemsPrice = this.calculateItemsPrice(items);
        const basePrice = this.calculateRentDate(timeRange, pricePerHour);
        return itemsPrice + basePrice;
    }
}

export default BookingPriceUtils;
