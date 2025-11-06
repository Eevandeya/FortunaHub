import { useCallback, useEffect } from 'react';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { addBookingItems, removeBookingItem } from '@store/bookingSlice.js';
import { useDispatch } from 'react-redux';
import { useGetItemsQuantityQuery } from '@root.api/rentingItemsApi.js';
import { addItems, removeItem } from '@store/itemsSlice.js';

export const useInventory = () => {
    const {
        data: inventory,
        isLoading,
        error,
        isError,
    } = useGetItemsQuantityQuery();
    const { handleHookError } = useErrorHandler();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            handleHookError(error, 'useInventory', {
                action: 'getSelectedItems',
            });
        }
    }, [error, handleHookError, isError]);

    const deleteItem = (items) => {
        for (const item of items) {
            if (!item.quantity) {
                dispatch(removeItem({ slug: item.slug }));
                dispatch(removeBookingItem({ slug: item.slug }));
            }
        }
    };

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
                    throw new Error('Incorrect value');
                }
                const selectItems = items.map((item) => ({
                    quantity: item.quantity,
                    slug: item.slug,
                    displayName: item.name,
                }));

                dispatch(addBookingItems({ items: selectItems }));
                dispatch(addItems({ items: selectItems }));
            } catch (error) {
                handleHookError(error, 'useInventory', { action: 'reserve' });
            }
        },
        [dispatch]
    );

    return [inventory, isLoading, reserve, deleteItem];
};
