import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        order: {
            customer: { nickname: '', phoneNumber: '' },
            items: [],
            timeSlot: null,
            visitorsCount: 0,
            preferredContactMethod: 'whatsapp',
        },
        reload: true,
    },
    selectors: {
        selectReload: (state) => state.reload,
        selectStatus: (state) => state.status,
    },
    reducers: {
        setCustomerInfo(state, action) {
            const customerData = action.payload.customer;
            state.order.customer = { ...state.order.customer, ...customerData };
        },
        addItem(state, action) {
            state.order.items = action.payload.items;
        },
        removeItem(state, action) {
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
                timeSlot: null,
                visitorsCount: 0,
                preferredContactMethod: 'whatsapp',
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

export const { selectReload } = bookingSlice.selectors;
export default bookingSlice.reducer;
