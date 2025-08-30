import { useState} from 'react';
import { getItemsQuantity, setReservedItems } from '../../api/rentingItemsApi.js';
import { useFetching } from './useFetching.js';
import {useErrorHandler} from "./useErrorHandler.js"

export const useInventory = () => {
    const [inventory, setInventory] = useState([])
    const [fetchingAvailableItems, isLoading] = useFetching(getSelectedItems);
    const {handleHookError} = useErrorHandler()


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
            handleHookError(error, "useInventory", { action : "getSelectedItems"})
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
            await setReservedItems(itemsObject)
        } catch(error) {
            handleHookError(error, "useInventory", { action : "reserve"})
        }
    }

    return [inventory, isLoading, reserve];
};
