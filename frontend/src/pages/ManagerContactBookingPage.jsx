import BookingStatusLayout from '../components/layout/pagesLayout/BookingStatusLayout.jsx';
import Button from '@components.common/button/Button.jsx';
import { ROUTES } from '@root.consts/navigation.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ManagerContactStatusPage = () => {
    const [isCopied, setIsCopied] = useState(false);
    const navigate = useNavigate();

    const handleCopyBookingLink = async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
        } catch {
            /* empty */
        }
    };

    const handleDownloadPdf = () => {
        window.print();
    };

    return (
        <BookingStatusLayout
            variant={{
                style: 'pending',
                icon: <div className='status-card_icon'>⏳</div>,
            }}
            statusInfo='Бронь ожидает подтверждения'
            statusDescription='           Менеджер свяжется с вами для подтверждения брони и
                            согласования оплаты.'
            infoCard={(props) => (
                <>
                    <ul className='status-list'>
                        <li>
                            <h5>Имя:</h5>
                            <p>{props?.bookingData?.customer?.nickname}</p>
                        </li>
                        <li>
                            <h5>Телефон:</h5>
                            <p>{props?.bookingData?.customer?.phoneNumber}</p>
                        </li>
                        <li>
                            <h5>Время:</h5>
                            <p>
                                {props?.bookingData?.start} —{' '}
                                {props?.bookingData?.end}
                            </p>
                        </li>
                        <li>
                            <h5>Посетители: </h5>
                            <p>{props?.bookingData?.visitors}</p>
                        </li>
                        <li>
                            <h5>Товары:</h5>
                            <ul>
                                {props?.bookingData?.items?.map(
                                    (item, index) => (
                                        <li key={index}>
                                            {item.slug} × {item.quantity}
                                        </li>
                                    )
                                )}
                            </ul>
                        </li>
                        <li>
                            <h5>Статус: </h5>
                            <span className='status-tag pending'>
                                Не оплачен
                            </span>
                        </li>
                    </ul>
                </>
            )}
            actions={
                <>
                    <Button
                        onClick={() => navigate(ROUTES.HOME)}
                        message='На главную'
                    />
                    <Button
                        onClick={handleCopyBookingLink}
                        message={`${isCopied ? '\u2713' : 'Скопировать ссылку'}`}
                    />
                    <Button
                        onClick={handleDownloadPdf}
                        message='Скачать в pdf'
                    />
                </>
            }
        />
    );
};
