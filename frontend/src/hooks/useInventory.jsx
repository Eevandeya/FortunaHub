import { useState} from 'react';
import { getItemsQuantity, setReservedItems } from '../../api/rentingItemsApi.js';
import { useFetching } from './useFetching.js';

export const useInventory = () => {
    const [inventory, setInventory] = useState([])
    const [fetchingAvailableItems, isLoading, error] =
        useFetching(getSelectedItems);

    async function getSelectedItems() {
        try {
            const data = await getItemsQuantity();
            if (!Array.isArray(data)) return false;
            if (!data.every(item => typeof item === 'object' && item !== null && !Array.isArray(item)))
            {
                throw new Error("Неверные данные в инвентаре")
            }
            setInventory(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async function reserve(items) {
        try {
            if (
              !Array.isArray(items) ||
              !items.every(
                (item) =>
                  typeof item === 'object' &&
                  item !== null &&
                  !Array.isArray(item))) {
                throw new Error('Ошибка в банных принадлежностях');
            }

            const itemsObject = inventory.map((item, index) => {
                    return ({quantity: item.quantity, slug: item.slug })
                });

            await setReservedItems(itemsObject).catch(
              (error) => Promise.reject(error)
            );
        } catch(error) {
            return Promise.reject(error.message)
        }
    }

    return [inventory, isLoading, error, reserve];
};
