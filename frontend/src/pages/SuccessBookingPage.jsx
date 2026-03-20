import BookingStatusLayout from '../components/layout/pagesLayout/BookingStatusLayout.jsx';
import Button from '@components.common/button/Button.jsx';
import { ROUTES } from '@root.consts/navigation.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShareButton from '../components/common/button/ShareButton.jsx';

export const SuccessStatusPage = () => {
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
                style: 'success',
                icon: <div className='status-card_icon'>&#10004;</div>,
            }}
            statusInfo='Бронь подтверждена'
            statusDescription='Оплата прошла успешно. Сохраните номер брони и проверьте детали ниже.'
            infoCard={(bookingData) => (
                <>
                    <ul className='status-list'>
                        <li>
                            <h5>Имя:</h5>
                            <h5>{bookingData?.customer?.nickname}</h5>
                        </li>
                        <li>
                            <h5>Телефон:</h5>
                            <h5>{bookingData?.customer?.phoneNumber}</h5>
                        </li>
                        <li>
                            <h5>Время:</h5>
                            <h5>
                                {bookingData?.start} — {bookingData?.end}
                            </h5>
                        </li>
                        <li>
                            <h5>Посетители: </h5>
                            <h5>{bookingData?.visitors}</h5>
                        </li>
                        <li>
                            <h5>Товары:</h5>
                            <ul>
                                {bookingData?.items?.map((item, index) => (
                                    <li key={index}>
                                        {item.slug} × {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <h5>Статус: </h5>
                            <span className='status-tag success'>Оплачен</span>
                        </li>
                    </ul>
                    <div className='total-price'>
                        <h3>{`Итоговая цена: ${bookingData?.price}`}</h3>
                    </div>
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
