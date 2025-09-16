import { createSlice } from '@reduxjs/toolkit';

/*
export const fetchBooking = createAsyncThunk(
    'booking/fetchBooking',
    async function (_, { rejectWithValue, getState, dispatch }) {
        const { booking : { order : {customer, items, timeSlot, visitors_count, preferred_contact_method}}} = getState();
        try {
            await api_handler.post(
                'api/bookings/create/',
                {
                    customer,
                    items,
                    start_datetime: timeSlot.start,
                    end_datetime: timeSlot.end,
                    visitors_count,
                    preferred_contact_method,
                },
                { headers: { 'Content-Type': 'application/json' } }
            );
            dispatch(resetBookings());
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);*/
const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        order: {
            customer: { nickname: '', phone_number: '' },
            items: [],
            timeSlot: null,
            visitors_count: 0,
            preferred_contact_method: 'whatsapp',
        },
        reload: true,
    },
    selectors: {
        selectReload: (state) => state.reload,
        selectStatus: (state) => state.status,
    },
    reducers: {
        setCustomerInfo(state, action) {
            const customer_data = action.payload.customer;
            state.order.customer = { ...state.customer, ...customer_data };
        },
        addItem(state, action) {
            state.order.items = action.payload.items;
        },
        removeItem(state, action) {
            state.order.items?.filter(
                (item) => item.slug !== action.payload.slug
            );
        },
        setTimeSlot(state, action) {
            state.order.timeSlot = action.payload.timeSlot;
        },
        setVisitorsCount(state, action) {
            state.order.visitors_count = action.payload.visitors_count;
        },
        setPreferredContactMethod(state, action) {
            state.order.preferred_contact_method =
                action.payload.preferred_contact_method;
        },
        resetBookings(state) {
            state.order = {
                customer: { nickname: '', phone_number: '' },
                items: [],
                timeSlot: null,
                visitors_count: 0,
                preferred_contact_method: 'whatsapp',
            };
        },
    },
});

export const {
    setCustomerInfo,
    addItem,
    removeItem,
    setTimeSlot,
    setVisitorsCount,
    setPreferredContactMethod,
    resetBookings,
} = bookingSlice.actions;

export const { selectError, selectReload } = bookingSlice.selectors;
export default bookingSlice.reducer;
