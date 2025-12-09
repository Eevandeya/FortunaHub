import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        order: {
            customer: { nickname: '', phoneNumber: '' },
            items: [],
            timeSlot: { start: '', end: '' },
            visitorsCount: 0,
            preferredContactMethod: 'whatsapp',
        },
        status: {
            current: 'idle',
            statusMessage: '',
            attempts: 0,
            lastAttempt: null,
        },
    },
    selectors: {
        selectStatus: (state) => state.status.current,
        selectStatusMessage: (state) => state.status.statusMessage,
    },
    reducers: {
        setCustomerInfo(state, action) {
            const customerData = action.payload.customer;
            state.order.customer = { ...state.order.customer, ...customerData };
        },
        addBookingItems(state, action) {
            state.order.items = action.payload.items;
        },
        removeBookingItem(state, action) {
            state.order.items = state.order.items?.filter(
                (item) => item.slug !== action.payload.slug
            );
        },
        setTimeSlot(state, action) {
            state.order.timeSlot = action.payload.timeSlot;
        },
        setVisitorsCount(state, action) {
            state.order.visitorsCount = action.payload.visitorsCount;
        },
        setPreferredContactMethod(state, action) {
            state.order.preferredContactMethod =
                action.payload.preferredContactMethod;
        },
        resetBookings(state) {
            state.order = {
                customer: { nickname: '', phoneNumber: '' },
                items: [],
                timeSlot: { start: '', end: '' },
                visitorsCount: 0,
                preferredContactMethod: 'whatsapp',
            };
        },
        setBookingStatusState(state, action) {
            state.status.current = action.payload.status;
        },
        setBookingStatus(state, action) {
            state.status.current = action.payload.status;
            state.status.attempts += 1;
            state.status.lastAttempt = action.payload.lastAttempt;
            state.status.statusMessage = action.payload.statusMessage;
        },
        resetBookingStatus(state) {
            state.status.current = 'idle';
            state.status.statusMessage = '';
            state.status.attempts = 0;
            state.status.lastAttempt = null;
        },
    },
});

export const {
    setCustomerInfo,
    addBookingItems,
    removeBookingItem,
    setTimeSlot,
    setVisitorsCount,
    setPreferredContactMethod,
    resetBookings,
    setBookingStatus,
    setBookingStatusState,
    resetBookingStatus,
} = bookingSlice.actions;

export const { selectStatus, selectStatusMessage } = bookingSlice.selectors;
export default bookingSlice.reducer;
