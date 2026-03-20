import { useNavigate, useRouteError } from 'react-router-dom';
import Button from '@components.common/button/Button.jsx';
import { ROUTES } from '@root.consts/navigation.js';
import BookingStatusLayout from '../components/layout/pagesLayout/BookingStatusLayout.jsx';

export const FailureStatusPage = () => {
    const navigate = useNavigate();
    const error = useRouteError();

    return (
        <BookingStatusLayout
            variant={{
                style: 'failed',
                icon: <div className='status-card_icon'>&#x2717;</div>,
            }}
            statusInfo='Не удалось подтвердить бронь'
            statusDescription='Во время обработки произошла ошибка. Попробуйте снова или свяжитесь с нами.'
            infoCard={() => (
                <ul className='status-list'>
                    <li>
                        <h5>Код ошибки: {error?.status}</h5>
                    </li>
                    <li>
                        <h5>Сообщение: {error?.message}</h5>
                    </li>
                    <li>
                        <h5>Статус: </h5>
                        <span className='status-tag failed'>Ошибка</span>
                    </li>
                </ul>
            )}
            actions={
                <>
                    <Button
                        onClick={() => navigate(ROUTES.BOOKING.TIME)}
                        message='Попробовать заново'
                    />
                </>
            }
        />
    );
};
