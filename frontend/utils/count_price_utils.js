import { addMinutes } from 'date-fns';

class CountPriceUtils {
    static ITEM_TYPE = { rented: 'арендовать', consumable: 'купить' };

    static calculateRentDate(dates, price_per_30 = 500) {
        const start_time = dates.start;
        const end_time = dates.end;
        let total_price = 0;
        for (let tm = start_time; tm < end_time; ) {
            total_price += price_per_30;
            addMinutes(tm, 30);
        }
        return total_price;
    }

    static calculateItemsPrice(items) {
        let total_price = 0;
        if (typeof items !== Array && items.lenght === 0) {
            throw new Error('Некорректные данные о предметах');
        }
        for (const item in items) {
            total_price += item.quantity * item.unit_price;
        }
        return total_price;
    }

    static calculateTotalPrice(items, dates, price_per_30) {
        const items_price = this.calculateItemsPrice(items);
        const rent_date_price = this.calculateRentDate(dates, price_per_30);
        return items_price + rent_date_price;
    }
}

export default CountPriceUtils;
