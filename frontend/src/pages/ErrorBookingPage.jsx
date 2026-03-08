import InfoCard from '@components.common/displayInfo/infoCard/InfoCard.jsx';
import { useNavigate, useRouteError } from 'react-router-dom';
import Button from '@components.common/button/Button.jsx';
import { ROUTES } from '@root.consts/navigation.js';

export const FailureStatusPage = () => {
    const navigate = useNavigate();
    const { data: responseError, status } = useRouteError();

    const parsedData = JSON.parse(responseError ?? '{}');

    return (
        <div className='container status'>
            <div className='status-container'>
                <div className='status-title failure'>
                    Ошибка при попытке оплаты
                </div>

                <InfoCard>
                    <ul className='status-list'>
                        <li>
                            <h5>Код ошибки: {status}</h5>
                        </li>
                        <li>
                            <h5>Сообщение: {parsedData?.message}</h5>
                        </li>
                    </ul>
                </InfoCard>

                <div className='status-actions'>
                    <Button
                        onClick={() => navigate(ROUTES.BOOKING.TIME)}
                        message='Попробовать заново'
                    />
                </div>
            </div>
        </div>
    );
};
