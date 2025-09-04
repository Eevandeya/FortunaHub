import { useReducer } from 'react';
import { BookingContext } from '@context/Context.js';

const initialState = {
    customer: { nickname: '', phone_number: '' },
    items: [],
    timeSlot: null,
    visitors_count: 0,
    preferred_contact_method: 'whatsapp',
};

const bookingReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CUSTOMER_INFO': {
            return {
                ...state,
                customer: { ...state.customer, ...action.payload },
            };
        }
        case 'ADD_ITEM': {
            return { ...state, items: [...action.payload] };
        }
        case 'REMOVE_ITEM': {
            return {
                ...state,
                items: [
                    ...state.items.filter(
                        (item) => item.slug !== action.payload
                    ),
                ],
            };
        }
        case 'SET_TIME_SLOT': {
            return {
                ...state,
                timeSlot: { ...state.timeSlot, ...action.payload },
            };
        }
        case 'SET_VISITORS_COUNT': {
            return { ...state, visitors_count: action.payload };
        }
        case 'SET_PREFERRED_CONTACT_METHOD': {
            return { ...state, preferred_contact_method: action.payload };
        }
        case 'RESET_BOOKINGS': {
            return initialState;
        }
    }
};

const BookingProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bookingReducer, initialState);
    const actions = {
        setCustomerInfo: (info) =>
            dispatch({ type: 'SET_CUSTOMER_INFO', payload: info }),
        addItem: (items) => dispatch({ type: 'ADD_ITEM', payload: items }),
        removeItem: (item) => dispatch({ type: 'REMOVE_ITEM', payload: item }),
        setTimeSlot: (timeSlot) =>
            dispatch({ type: 'SET_TIME_SLOT', payload: timeSlot }),
        setVisitorsCount: (visitorsCount) =>
            dispatch({ type: 'SET_VISITORS_COUNT', payload: visitorsCount }),
        setPreferredContactMethod: (preferredContactMethod) =>
            dispatch({
                type: 'SET_PREFERRED_CONTACT_METHOD',
                payload: preferredContactMethod,
            }),
        resetBookings: () => dispatch({ type: 'RESET_BOOKINGS' }),

        getBookingData: () => ({
            customer: state.customer,
            items: state.items,
            timeSlot: state.timeSlot,
            visitors_count: state.visitors_count,
            preferred_contact_method: state.preferred_contact_method,
        }),
    };

    return (
        <BookingContext.Provider value={{ ...actions, ...state }}>
            {children}
        </BookingContext.Provider>
    );
};

export default BookingProvider;
