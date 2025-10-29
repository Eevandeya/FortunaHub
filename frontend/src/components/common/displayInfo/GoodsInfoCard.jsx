import InfoCard from '@components.common/displayInfo/InfoCard.jsx';

export const GoodsInfoCard = ({ items }) => (
    <InfoCard>
        <h2 style={{ fontSize: '24px' }}>Общая стоимость</h2>
        <ul>
            {items.map((item, index) => (
                <li key={index}>
                    <p>
                        {item.displayName}, кол-во: {item.quantity}{' '}
                    </p>
                </li>
            ))}
        </ul>
        <h3 style={{ fontSize: '18px' }}>Итог</h3>
    </InfoCard>
);
