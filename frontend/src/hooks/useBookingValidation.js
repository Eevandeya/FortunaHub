import { ROUTES } from '@root.consts/navigation.js';
import { useContext } from 'react';
import { ErrorBookingContext } from '@context/Context.js';
import { useAvailableTimes } from './timeHandler.js';
import { useSelector } from 'react-redux';
import { selectDateTime } from '@store/dateTimeSlice.js';
import { selectItems } from '@store/itemsSlice.js';
import { useGetSaunaConfigQuery } from '@root.api/saunaConfig.js';
import { useInventory } from './useInventory.js';
import {
    checkDateSelected,
    checkTimeBooked,
    checkTimeDeprecated,
    checkTimeSelected,
} from '../validators/timeValidators.js';
import createValidator from '../validators/createValidator.js';
import {
    checkGoodsQuantity,
    checkGoodsSelected,
} from '../validators/goodsValidators.js';

const useBookingValidation = () => {
    const context = {
        dateTime: useSelector(selectDateTime),
        items: useSelector(selectItems),
        config: useGetSaunaConfigQuery(),
    };
    const [slots] = useAvailableTimes(context.dateTime?.date);
    const [inventory] = useInventory();
    const { registerError, clearErrors } = useContext(ErrorBookingContext);

    const timeValidator = createValidator()
        .add(checkDateSelected)
        .add(checkTimeSelected)
        .add(checkTimeDeprecated)
        .add(checkTimeBooked);

    const goodsValidator = createValidator()
        .add(checkGoodsSelected)
        .add(checkGoodsQuantity);

    const validationSteps = {
        [ROUTES.BOOKING.TIME]: timeValidator.validate({
            ...context,
            freeSlots: slots,
        }),
        [ROUTES.BOOKING.GOODS]: goodsValidator.validate({
            ...context,
            inventory,
        }),
    };

    return { validationSteps, registerError, clearErrors };
};

export default useBookingValidation;
