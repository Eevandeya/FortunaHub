import InfoCard from '@components.common/displayInfo/infoCard/InfoCard.jsx';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import CopyButton from '@components.common/button/CopyButton.jsx';
import { useParams } from 'react-router';
import Button from '@components.common/button/Button.jsx';
import { ROUTES } from '@root.consts/navigation.js';
import { useState } from 'react';

export const SuccessStatusPage = () => {
    const { orderNumber } = useParams();
    const bookingData = useRouteLoaderData('status');
    const navigate = useNavigate();
    const [isCopied, setIsCopied] = useState(false);

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
        <div className='status-container'>
            <div className='status-title success'>
                {`Бронь №${orderNumber}`}
                <CopyButton copyData={orderNumber} />
            </div>

            <InfoCard>
                <ul className='status-list'>
                    <li>
                        <h5>Имя: {bookingData?.customer?.nickname}</h5>
                    </li>
                    <li>
                        <h5>Телефон: {bookingData?.customer?.phoneNumber}</h5>
                    </li>
                    <li>
                        <h5>
                            Время: {bookingData?.start} — {bookingData?.end}
                        </h5>
                    </li>
                    <li>
                        <h5>Посетители: {bookingData?.visitors}</h5>
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
                </ul>
            </InfoCard>

            <div className='status-actions'>
                <Button
                    onClick={() => navigate(ROUTES.HOME)}
                    message='На главную'
                />
                <Button
                    onClick={handleCopyBookingLink}
                    message={`${isCopied ? '\u2713' : 'Скопировать ссылку'}`}
                />
                <Button onClick={handleDownloadPdf} message='Скачать в pdf' />
            </div>
        </div>
    );
};
