import { useInventory } from './useInventory.js';
import { useSelector } from 'react-redux';
import { selectPricePerHour } from '../store/pricingSelector.js';
import { useCallback, useMemo } from 'react';

const usePriceList = () => {
    const [inventory, isLoading] = useInventory();
    const pricePerHour = useSelector(selectPricePerHour);

    const productPrice = useMemo(() => {
        if (!isLoading || !inventory) {
            return;
        }
        const inventoryPriceList = inventory.map((item) => ({
            name: item.display_name,
            price: item.unit_price,
            type: item.item_type,
        }));
        return inventoryPriceList;
    }, [inventory, isLoading]);

    const servicePrice = useMemo(() => {
        if (!pricePerHour) return;
        return [
            { name: 'Русская баня с каменкой(1 час)', price: pricePerHour },
        ];
    }, [pricePerHour]);
    const buildPriceList = useCallback(() => {
        const priceList = [];
        priceList.push(
            { category: 'Банные принадлежности', data: productPrice },
            { category: 'Услуги русской бани', data: servicePrice }
        );
        return priceList;
    }, [productPrice]);

    return buildPriceList;
};

export default usePriceList;
