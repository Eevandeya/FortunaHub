import Modal from '@components.common/modal/Modal.jsx';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import paymentMethods from '@root.consts/paymentMethods.js';
import usePaymentChoice from '../../../hooks/usePaymentChoice.js';
import Loading from '../../common/loader/Loading.jsx';
import { useDispatch } from 'react-redux';
import { setBookingStatusState } from '../../../store/bookingSlice.js';
import styles from './payment.module.css';
import PaymentMethodCard from './PaymentMethodCard.jsx';
import SelectButton from '../../common/button/SelectButton.jsx';

const PaymentModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);

    const [status, loading, sendBookingData] = usePaymentChoice();
    const dispatch = useDispatch();

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMethod(null);
        dispatch(setBookingStatusState({ status: 'idle' }));
    };

    useEffect(() => {
        if (status === 'draft' || status === 'success') {
            setIsModalOpen(true);
        }
    }, [status]);
    return createPortal(
        <Modal closeModal={closeModal} modalState={isModalOpen}>
            {loading && <Loading />}

            <div className={styles.payment_methods_container}>
                {paymentMethods.map((method) => (
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
                onClick={() => sendBookingData(selectedMethod)}
                value='Оплатить'
            />
        </Modal>,
        document.body
    );
};

export default PaymentModal;
