import { useCallback, useEffect } from 'react';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { addBookingItems, removeBookingItem } from '@store/bookingSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useGetItemsQuantityQuery } from '@root.api/rentingItemsApi.js';
import { addItems, removeItem } from '@store/itemsSlice.js';
import { selectItems } from '@store/itemsSlice.js';

export const useInventory = () => {
    const {
        data: inventory,
        isLoading,
        error,
        isError,
    } = useGetItemsQuantityQuery();
    const { handleHookError } = useErrorHandler();
    const dispatch = useDispatch();
    const bookedItems = useSelector(selectItems);

    useEffect(() => {
        if (isError) {
            handleHookError(error, 'useInventory', {
                action: 'getSelectedItems',
            });
        }
    }, [error, handleHookError, isError]);

    const deleteItems = useCallback(
        (items) => {
            for (const item of items) {
                if (!item.quantity) {
                    dispatch(removeItem({ slug: item.slug }));
                    dispatch(removeBookingItem({ slug: item.slug }));
                }
            }
        },
        [dispatch]
    );

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
                const bookingSelectItems = items
                    .filter((item) => item.quantity)
                    .map((item) => ({
                        quantity: item.quantity,
                        slug: item.slug,
                    }));
                const selectItems = items
                    .filter((item) => item.quantity)
                    .map((item) => ({
                        quantity: item.quantity,
                        slug: item.slug,
                        displayName: item.name,
                        unitPrice: item.unitPrice,
                    }));
                dispatch(addBookingItems({ items: bookingSelectItems }));
                dispatch(addItems({ items: selectItems }));
            } catch (error) {
                handleHookError(error, 'useInventory', { action: 'reserve' });
            }
        },
        [dispatch]
    );

    return [inventory, bookedItems, isLoading, reserve, deleteItems];
};
