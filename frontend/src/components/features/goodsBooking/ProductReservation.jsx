import { useEffect, useState, useMemo, useCallback } from 'react';
import { useInventory } from '@hooks/useInventory.js';
import ItemHandler from '@components.common/goods/itemHandler.jsx';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { ITEM_TYPE } from '@root.consts/constants';
import './products.css';

const ProductReservation = () => {
    const [inventory, isLoading, reserve, deleteItem] = useInventory();
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
                unitPrice: item.unitPrice,
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
                deleteItem(items);
                resetItems();
            }
        } catch (error) {
            handleApiError(error, { at: 'AccessoriesRental' });
        }
    }, [items, reserve, handleApiError]);

    return (
        <div className='products_selector'>
            <header>
                <div className='products_selector_header'>
                    <p>Выберите товары</p>
                </div>
            </header>
            <section className='products_selector_container'>
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
            </section>
            <button
                className='products_selector_button'
                onClick={modalHandleReserve}>
                Арендовать
            </button>
        </div>
    );
};
export default ProductReservation;
