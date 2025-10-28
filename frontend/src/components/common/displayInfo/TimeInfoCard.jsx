import { format } from 'date-fns';
import InfoCard from '@components.common/displayInfo/InfoCard.jsx';

export const TimeInfoCard = ({ timeSlot, date }) => (
    <InfoCard>
        <ul>
            <li key={1}>
                <p>Выбранная дата: {date && format(date, 'yyyy-MM-dd')}</p>
            </li>
            <li key={2}>
                <p>
                    Выбранное время:{' '}
                    {timeSlot && format(timeSlot.start, 'HH:mm')}—
                    {timeSlot && format(timeSlot.end, 'HH:mm')}
                </p>
            </li>
        </ul>
    </InfoCard>
);
