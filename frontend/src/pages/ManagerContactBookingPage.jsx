import InfoCard from '@components.common/displayInfo/infoCard/InfoCard.jsx';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import CopyButton from '@components.common/button/CopyButton.jsx';
import { useParams } from 'react-router';
import Button from '@components.common/button/Button.jsx';
import { ROUTES } from '@root.consts/navigation.js';
import { CONTACTS } from '@root.consts/contactMethods.js';

export const ManagerContactStatusPage = () => {
    const { orderNumber } = useParams();
    const bookingData = useRouteLoaderData('status');
    const navigate = useNavigate();

    return (
        <div className='status-container'>
            <div className='status-notice pending'>
                <h4>Бронирование ожидает подтверждения</h4>
                <p>
                    Наш менеджер свяжется с вами в ближайшее время для
                    подтверждения брони и согласования способа оплаты. Если в
                    течение {<u>5–10 минут</u>} этого не произошло, вы можете
                    связаться с нами самостоятельно.
                </p>
            </div>
            <div className='status-title pending'>
                {`Бронь №${orderNumber}. `}
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
                <a href={CONTACTS.PHONE.href}>Свяжитесь с нами</a>
                <a href={CONTACTS.TELEGRAM.href}>{CONTACTS.TELEGRAM.print}</a>
            </div>
        </div>
    );
};
