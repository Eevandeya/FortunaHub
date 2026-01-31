import { useSelector } from 'react-redux';
import { selectItems } from '../store/itemsSlice.js';
import { ROUTES } from '../../consts/navigation.js';
import { selectDateTime } from '../store/dateTimeSlice.js';
import { useContext } from 'react';
import { ErrorBookingContext } from '../context/Context.js';

const useBookingValidation = () => {
    const dateTime = useSelector(selectDateTime);
    const items = useSelector(selectItems);
    const { registerError, clearErrors } = useContext(ErrorBookingContext);
    const validationSteps = {
        [ROUTES.BOOKING.TIME]: {
            valid: dateTime.time?.start && dateTime.time?.end && dateTime.date,
            fields: {
                timeSlots: !(dateTime?.start && dateTime?.end),
                date: !dateTime.date,
            },
            pageId: 'time',
        },
        [ROUTES.BOOKING.GOODS]: {
            valid: items.length > 0,
            fields: { items: !(items.length < 0) },
            pageId: 'goods',
        },
    };

    return { validationSteps, registerError, clearErrors };
};

export default useBookingValidation;
