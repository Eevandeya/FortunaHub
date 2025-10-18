import { useCallback, useEffect, useRef, useState } from 'react';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { addItem } from '@store/bookingSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { reloadItems } from '@store/itemsSlice.js';
import { useGetItemsQuantityQuery } from '../../api/rentingItemsApi.js';
import { selectReload } from '@store/itemsSlice.js';

export const useInventory = () => {
    const {
        data: inventoryData,
        isLoading,
        error,
        isError,
    } = useGetItemsQuantityQuery();
    const reload = useSelector((state) => selectReload(state));
    const [inventory, setInventory] = useState();
    const { handleHookError } = useErrorHandler();
    const dispatch = useDispatch();
    const isReloadRef = useRef(reload);

    function getSelectedItems() {
        if (isLoading) return;

        setInventory(inventoryData);

        if (isError) {
            handleHookError(error, 'useInventory', {
                action: 'getSelectedItems',
            });
        }
    }

    useEffect(() => {
        if (isReloadRef.current && inventoryData) {
            getSelectedItems();
            dispatch(reloadItems());
            isReloadRef.current = reload;
        }
    }, [dispatch, getSelectedItems]);

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
                const selectItems = items.map((item) => ({
                    quantity: item.quantity,
                    slug: item.slug,
                }));

                dispatch(addItem({ items: selectItems }));
            } catch (error) {
                handleHookError(error, 'useInventory', { action: 'reserve' });
            }
        },
        [addItem]
    );

    return [inventory, isLoading, reserve];
};
