import InfoCard from '@components.common/displayInfo/InfoCard.jsx';
import { useSelector } from 'react-redux';
import { useBookingPrice } from '../../../hooks/useBookingPrice.js';
import { selectItems } from '@store/itemsSlice.js';

export const PriceInfoCard = ({ navigation }) => {
    const dateTime = useSelector((state) => state.datetime);
    const items = useSelector(selectItems);
    const [currentPrice, notification] = useBookingPrice(
        { items, dateTime },
        navigation.path
    );

    return (
        <InfoCard>
            <h3>
                {notification}
                {currentPrice}
            </h3>
        </InfoCard>
    );
};
