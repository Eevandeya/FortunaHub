import { useRouteLoaderData } from 'react-router-dom';
import { useParams } from 'react-router';
import InfoCard from '../../common/displayInfo/infoCard/InfoCard.jsx';
import Card from '../../common/card/Card.jsx';
import ShareButton from '../../common/button/ShareButton.jsx';

const BookingStatusLayout = ({
    variant,
    statusInfo,
    statusDescription,
    infoCard,
    actions,
}) => {
    const { orderNumber } = useParams();
    const bookingData = useRouteLoaderData('status');

    return (
        <div className='status-container'>
            <div className='status-title'>
                <h2>{`Бронь №${orderNumber}`}</h2>
            </div>
            <Card className={`status-card ${variant.style}`}>
                {variant.icon}

                <div className=''>
                    <h3 className='status-card_title'>{statusInfo}</h3>
                    <p className='status-card_text'>{statusDescription}</p>
                </div>
            </Card>
            <InfoCard
                className={'status-card'}
                title={
                    <div className='card-title_block'>
                        <h3>Детали заказа</h3>
                        <ShareButton
                            url={window.location.href}
                            title='FortunaHub'
                            text={'Загляните к нам попариться'}
                        />
                    </div>
                }>
                {infoCard?.(bookingData)}
            </InfoCard>
            <div className='status-actions'>{actions}</div>
        </div>
    );
};

export default BookingStatusLayout;
