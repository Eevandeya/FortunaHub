import { format } from 'date-fns';
import InfoCard from '@components.common/displayInfo/InfoCard.jsx';
import { useSelector } from 'react-redux';

export const TimeInfoCard = () => {
    const { date, time: timeSlot } = useSelector((state) => state.datetime);

    return (
        <InfoCard>
            <ul>
                <li key={1}>
                    <p>Выбранная дата: {date && format(date, 'yyyy-MM-dd')}</p>
                </li>
                <li key={2}>
                    <p>
                        Выбранное время:
                        {timeSlot && timeSlot.start}—{timeSlot && timeSlot.end}
                    </p>
                </li>
            </ul>
        </InfoCard>
    );
};
