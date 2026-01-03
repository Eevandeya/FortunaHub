import Modal from '@components.common/modal/Modal.jsx';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import paymentMethods from '@root.consts/paymentMethods.js';
import InfoCard from '../../common/displayInfo/InfoCard.jsx';
import usePaymentChoice from '../../../hooks/usePaymentChoice.js';
import Loading from '../../common/loader/Loading.jsx';
import { useDispatch } from 'react-redux';
import { setBookingStatusState } from '../../../store/bookingSlice.js';
import './payment.css';

const PaymentModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, loading, sendBookingData] = usePaymentChoice();
    const dispatch = useDispatch();

    const handleDivClick = (event) => {
        if (event.target.type !== 'checkbox') {
            const checkbox = event.currentTarget.querySelector(
                'input[type="checkbox"]'
            );
            checkbox.click();
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        dispatch(setBookingStatusState({ status: 'idle' }));
    };

    useEffect(() => {
        if (status !== 'draft' && status !== 'success') {
            return;
        }
        setIsModalOpen(true);
    }, [status]);

    return (
        <>
            {createPortal(
                <Modal closeModal={closeModal} modalState={isModalOpen}>
                    {loading && <Loading />}
                    <div className='payment-method-container'>
                        {paymentMethods.map((method) => (
                            <button
                                className='payment-method'
                                key={method.title}
                                onClick={handleDivClick}>
                                <div className='content'>
                                    <h4>{method.title}</h4>
                                    <h6>{method.description}</h6>
                                </div>
                                <div className='toggle-checkbox'>
                                    <input type='checkbox' />
                                </div>
                            </button>
                        ))}
                    </div>
                    <button
                        className='payment-button'
                        onClick={sendBookingData}>
                        <h4>Оплатить</h4>
                    </button>
                </Modal>,
                document.body
            )}
        </>
    );
};

export default PaymentModal;
