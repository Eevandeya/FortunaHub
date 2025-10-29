import { useEffect, useState, useMemo, useCallback } from 'react';
import { useInventory } from '@hooks/useInventory.js';
import ItemHandler from '@components.common/goods/itemHandler.jsx';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { ITEM_TYPE } from '@root.consts/constants';

const ProductReservation = () => {
    const [inventory, isLoading, reserve] = useInventory();
    const [items, setItems] = useState(null);
    const { handleApiError } = useErrorHandler();

    const parsedInventory = useMemo(() => {
        if (isLoading || !inventory) {
            return;
        }
        const itemsObject = inventory.map((item) => {
            return {
                total: item.quantity ?? 0,
                name: item.display_name,
                quantity: 0,
                slug: item.slug,
                itemType: item.itemType,
                isAvailable() {
                    return this.total > 0;
                },
            };
        });
        return itemsObject;
    }, [inventory]);

    useEffect(() => {
        if (parsedInventory) {
            setItems(parsedInventory);
        }
    }, [parsedInventory]);

    const resetItems = () => {
        setItems((currentItems) =>
            currentItems.map((item) => ({ ...item, quantity: 0 }))
        );
    };

    const handleIncrement = (item) => {
        setItems((prevItems) =>
            prevItems.map((it) =>
                it.slug === item.slug
                    ? { ...it, quantity: Math.min(it.quantity + 1, it.total) }
                    : it
            )
        );
    };

    const handleDecrement = (item) => {
        setItems((prevItems) =>
            prevItems.map((it) =>
                it.slug === item.slug
                    ? { ...it, quantity: Math.max(it.quantity - 1, 0) }
                    : it
            )
        );
    };

    const modalHandleReserve = useCallback(() => {
        try {
            if (items) {
                reserve(items);
                resetItems();
            }
        } catch (error) {
            handleApiError(error, { at: 'AccessoriesRental' });
        }
    }, [items, reserve, handleApiError]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
            }}>
            <div>
                {items?.map((item) => (
                    <ItemHandler
                        key={item.slug}
                        item={item}
                        count={item.quantity}
                        total={item.total}
                        itemType={ITEM_TYPE[`${item.item_type}`]}
                        onIncrement={() => handleIncrement(item)}
                        onDecrement={() => handleDecrement(item)}
                    />
                ))}
            </div>
            <button
                style={{
                    border: 'solid 1px black',
                    borderRadius: '30px',
                    width: '200px',
                    height: '100px',
                }}
                onClick={modalHandleReserve}>
                Арендовать
            </button>
        </div>
    );
};
export default ProductReservation;
