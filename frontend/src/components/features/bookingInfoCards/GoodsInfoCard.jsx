import InfoCard from '@components.common/displayInfo/infoCard/InfoCard.jsx';
import { useSelector } from 'react-redux';
import { selectItems } from '@store/itemsSlice.js';

export const GoodsInfoCard = () => {
    const items = useSelector(selectItems);

    return (
        <InfoCard title={<h3>Товары</h3>}>
            <ul>
                {items?.map((item, index) => (
                    <li key={index}>
                        <p>
                            {item.displayName}, кол-во: {item.quantity}{' '}
                        </p>
                    </li>
                ))}
            </ul>
        </InfoCard>
    );
};
