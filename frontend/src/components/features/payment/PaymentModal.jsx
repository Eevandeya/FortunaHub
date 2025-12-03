import Modal from '@components.common/modal/Modal.jsx';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import paymentMethods from '@root.consts/paymentMethods.js';
import InfoCard from '../../common/displayInfo/InfoCard.jsx';
import usePaymentChoice from '../../../hooks/usePaymentChoice.js';
import Loading from '../../common/loader/Loading.jsx';

const PaymentModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, loading, sendBookingData] = usePaymentChoice();

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
    };

    const openModal = () => {
        if (status !== 'draft' && status !== 'success') {
            return;
        }
        setIsModalOpen(true);
    };

    useEffect(openModal, [status]);

    return (
        <>
            {isModalOpen &&
                createPortal(
                    <Modal closeModal={closeModal}>
                        {loading && <Loading />}
                        {paymentMethods.map((method) => (
                            <button
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItem: 'center',
                                }}
                                key={method.title}
                                onClick={handleDivClick}>
                                <InfoCard>
                                    <h4>{method.title}</h4>
                                    <p>{method.description}</p>
                                    <input type='checkbox' />
                                </InfoCard>
                            </button>
                        ))}
                        <button
                            style={{
                                margin: '5px',
                                borderRadius: '10px',
                                backgroundColor: 'black',
                                width: '30%',
                                color: 'white',
                            }}
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
