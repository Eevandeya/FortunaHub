import InfoCard from '@components.common/displayInfo/infoCard/InfoCard.jsx';
import { useSelector } from 'react-redux';
import { useBookingPrice } from '@hooks/useBookingPrice.js';
import { selectItems } from '@store/itemsSlice.js';
import { selectDateTime } from '@store/dateTimeSlice.js';

export const PriceInfoCard = ({ navigation }) => {
    const dateTime = useSelector(selectDateTime);
    const items = useSelector(selectItems);
    const [currentPrice, notification] = useBookingPrice(
        { items, dateTime },
        navigation.path
    );

    return (
        <InfoCard title={<h3>Цена</h3>}>
            <p>
                {notification}
                {currentPrice}
            </p>
        </InfoCard>
    );
};
