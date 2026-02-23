import { useCallback, useEffect } from 'react';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { useDispatch, useSelector } from 'react-redux';
import { useGetItemsQuantityQuery } from '@root.api/rentingItemsApi.js';
import { addItems, removeItem, selectItems } from '@store/itemsSlice.js';

export const useInventory = () => {
    const {
        data: inventory,
        isLoading,
        error,
        isError,
    } = useGetItemsQuantityQuery(undefined, { pollingInterval: 300_000 });
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

                const selectItems = items
                    .filter((item) => item.quantity)
                    .map((item) => ({
                        quantity: item.quantity,
                        slug: item.slug,
                        displayName: item.name,
                        unitPrice: item.unitPrice,
                    }));
                dispatch(addItems({ items: selectItems }));
            } catch (error) {
                handleHookError(error, 'useInventory', { action: 'reserve' });
            }
        },
        [dispatch]
    );

    return [inventory, bookedItems, isLoading, reserve, deleteItems];
};
