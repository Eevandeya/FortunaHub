import { useState, useEffect, useCallback, useRef } from 'react';
import { getItemsQuantity } from '@root.api/rentingItemsApi.js';
import { useFetching } from '@hooks/useFetching.js';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { useBooking } from '@hooks/useBooking.js';

export const useInventory = () => {
    const [inventory, setInventory] = useState([]);
    const [fetching, isLoading] = useFetching(getSelectedItems);
    const { handleHookError } = useErrorHandler();
    const { addItem, removeItem } = useBooking();
    const isMountedRef = useRef(true);

    async function getSelectedItems() {
        if (isLoading || !isMountedRef.current) return;

        try {
            const data = await getItemsQuantity();

            if (!Array.isArray(data))
                throw new Error('Данные инвентаря должны быть массивом');
            if (
                !data.every(
                    (item) =>
                        typeof item === 'object' &&
                        item !== null &&
                        !Array.isArray(item)
                )
            ) {
                throw new Error('Неверные данные в инвентаре');
            }
            setInventory(data);
        } catch (error) {
            handleHookError(error, 'useInventory', {
                action: 'getSelectedItems',
            });
        }
    }

    useEffect(() => {
        if (isMountedRef.current) {
            fetching();
            isMountedRef.current = false;
        }
    }, [fetching]);

    const reserve = useCallback(
        (items) => {
            try {
                if (
                    !Array.isArray(items) ||
                    !items.every(
                        (item) =>
                            typeof item === 'object' &&
                            item !== null &&
                            !Array.isArray(item)
                    )
                ) {
                    throw new Error('Ошибка в банных принадлежностях');
                }
                const select_items = items.map((item) => ({
                    quantity: item.quantity,
                    slug: item.slug,
                }));

                addItem(select_items);
            } catch (error) {
                handleHookError(error, 'useInventory', { action: 'reserve' });
            }
        },
        [addItem]
    );

    return [inventory, isLoading, reserve];
};
