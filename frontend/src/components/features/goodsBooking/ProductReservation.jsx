import { useEffect, useState, useMemo, useCallback } from 'react';
import { useInventory } from '@hooks/useInventory.js';
import ItemHandler from './itemHandler.jsx';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { ITEM_TYPE } from '@root.consts/constants';
import styles from './products.module.css';
import SelectButton from '../../common/button/SelectButton.jsx';

const ProductReservation = (props) => {
    const [inventory, bookedItems, isLoading, reserve] = useInventory();
    const [items, setItems] = useState(null);
    const { handleApiError } = useErrorHandler();

    const parsedInventory = useMemo(() => {
        if (isLoading || !inventory) {
            return;
        }
        let bookedItemsObj;
        if (bookedItems.length) {
            bookedItemsObj = bookedItems.reduce((items, item) => {
                items[item.slug] = item.quantity;
                return items;
            }, {});
        }
        const itemsObject = inventory.map((item) => {
            return {
                total: item.quantity ?? 0,
                name: item.display_name,
                quantity: bookedItemsObj?.[item.slug] ?? 0,
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
            }
        } catch (error) {
            handleApiError(error, { at: 'AccessoriesRental' });
        }
    }, [items, reserve, handleApiError]);

    return (
        <div className={styles.products_selector}>
            <section className={styles.products_selector_container}>
                {items?.map((item) => (
                    <ItemHandler
                        key={item.slug}
                        item={item}
                        count={item.quantity}
                        maxCount={item.total}
                        itemType={ITEM_TYPE[`${item.item_type}`]}
                        onIncrement={() => handleIncrement(item)}
                        onDecrement={() => handleDecrement(item)}
                    />
                ))}
            </section>
            {props.hasError && <p style={{ color: 'red' }}>{props.error}</p>}
            <SelectButton onClick={modalHandleReserve} value='Выбрать' />
        </div>
    );
};
export default ProductReservation;
