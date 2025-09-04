import { useEffect, useState, useId, useMemo, useCallback } from 'react';
import { useInventory } from '@hooks/useInventory.jsx';
import Modal from '@components.features/Modal/Modal.jsx';
import ItemHandler from '@components.common/goods/itemHandler.jsx';
import { useErrorHandler } from '@hooks/useErrorHandler.js';
import { Time } from '@components.features/TimeBookingPopup/Time.jsx';
import useModal from '@hooks/useModal.js';
import DateSelector from '@components.common/date_picker/DatePicker.jsx';
import { startOfDay } from 'date-fns';
import BookingConfirm from '@components.features/BookingPopup/BookingConfirm.jsx';
import { useBooking } from '@hooks/useBooking.js';
import CountPriceUtils from '@root.utils/count_price_utils.js';

const BookingDetail = ({ modalActive, setModalActive }) => {
    const [inventory, isLoading, reserve] = useInventory();
    const [items, setItems] = useState(null);
    const { handleApiError } = useErrorHandler();
    const [modals, openModal, closeModal, closeAllModal] = useModal();
    const [date, setDate] = useState(new Date());
    const uniqueId = useId();
    const { timeSlot } = useBooking();

    const parsedInventory = useMemo(() => {
        const itemsObject = inventory.map((item) => {
            return {
                total: item.quantity ?? 0,
                name: item.display_name,
                quantity: 0,
                slug: item.slug,
                item_type: item.item_type,
                is_available() {
                    return this.total > 0;
                },
            };
        });
        return itemsObject;
    }, [inventory]);

    useEffect(() => {
        if (parsedInventory.length ?? 0 > 0) {
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

    return [
        <Modal
            active={modalActive}
            setActive={setModalActive}
            key={`${uniqueId}-modal`}>
            <div className='box'>
                <div className='content'>
                    <h2 className='title is-4'>Банные принадлежности</h2>
                    <div
                        style={{
                            width: '100%',
                            height: '150px',
                            backgroundColor: 'current-color',
                        }}></div>
                    {items?.map((item) => (
                        <ItemHandler
                            key={item.slug}
                            item={item}
                            count={item.quantity}
                            total={item.total}
                            itemType={
                                CountPriceUtils.ITEM_TYPE[`${item.item_type}`]
                            }
                            onIncrement={() => handleIncrement(item)}
                            onDecrement={() => handleDecrement(item)}
                        />
                    ))}

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <button
                            className='button is-primary'
                            onClick={() => openModal('time')}>
                            Time
                        </button>
                        <DateSelector date={date} setDate={setDate} />
                    </div>

                    <button
                        className={`button is-primary is-fullwidth ${isLoading ? 'is-loading' : ''}`}
                        onClick={() => {
                            modalHandleReserve();
                            openModal('bookingConfirm');
                        }}
                        disabled={
                            !timeSlot?.start &&
                            !timeSlot?.end &&
                            items?.every((item) => item.is_available())
                        }>
                        Забронировать
                    </button>
                </div>
            </div>
        </Modal>,
        <Time
            modalActive={modals.time?.isActive}
            setModalActive={() => closeModal('time')}
            date={startOfDay(date)}
            key={`${uniqueId}-time`}
        />,
        <BookingConfirm
            modalActive={modals.bookingConfirm?.isActive}
            setModalActive={() => closeModal('bookingConfirm')}
            key={`${uniqueId}-booking`}
        />,
    ];
};
export default BookingDetail;
