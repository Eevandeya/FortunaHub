import InfoCard from '@components.common/displayInfo/infoCard/InfoCard.jsx';
import { useSelector } from 'react-redux';
import { selectDateTime } from '@store/dateTimeSlice.js';

export const TimeInfoCard = () => {
    const { date, time } = useSelector(selectDateTime);

    return (
        <InfoCard title={<h3>Время</h3>}>
            <ul>
                <li key={1}>
                    <p>Дата: {date}</p>
                </li>
                <li key={2}>
                    <p>
                        Время:
                        {time && time.start}—{time && time.end}
                    </p>
                </li>
            </ul>
        </InfoCard>
    );
};
