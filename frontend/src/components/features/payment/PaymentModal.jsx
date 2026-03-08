import Modal from '@components.common/modal/Modal.jsx';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import paymentMethods from '@root.consts/paymentMethods.js';
import useCreateBooking from '@hooks/useCreateBooking.js';
import Loading from '@components.common/loader/Loading.jsx';
import styles from './payment.module.css';
import PaymentMethodCard from './PaymentMethodCard.jsx';
import SelectButton from '@components.common/button/SelectButton.jsx';
import { useSelector } from 'react-redux';
import { useBookingPrice } from '@hooks/useBookingPrice.js';
import { selectItems } from '@store/itemsSlice.js';
import { selectDateTime } from '@store/dateTimeSlice.js';
import BookingPriceUtils from '@root.utils/bookingPriceUtils.js';

const PaymentModal = ({ isModalOpen, closeModal }) => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [, loading, createBooking] = useCreateBooking();
    const dateTime = useSelector(selectDateTime);
    const items = useSelector(selectItems);
    const [currentPrice, , pricingData] = useBookingPrice(
        { items, dateTime },
        navigation.path
    );

    const paymentMethodsWithPrice =
        BookingPriceUtils.getPaymentMethodsWithPrice(
            paymentMethods,
            currentPrice,
            pricingData
        );

    return createPortal(
        <Modal closeModal={closeModal} modalState={isModalOpen}>
            <article className={styles.container}>
                {loading && <Loading />}
                <div className={styles.payment_methods_container}>
                    {paymentMethodsWithPrice?.map((method) => (
                        <PaymentMethodCard
                            key={method.id}
                            method={method}
                            checked={selectedMethod === method.id}
                            onSelect={() => setSelectedMethod(method.id)}
                        />
                    ))}
                </div>

                <SelectButton
                    aria-disabled={!selectedMethod}
                    onClick={() => {
                        createBooking(selectedMethod);
                    }}
                    value={(() => {
                        const selectedPrice = paymentMethodsWithPrice?.find(
                            (m) => m.id === selectedMethod
                        )?.price;
                        return !selectedPrice
                            ? 'Связаться с менеджером'
                            : `Оплатить ${selectedPrice} ₽`;
                    })()}
                />
            </article>
        </Modal>,
        document.body
    );
};

export default PaymentModal;
