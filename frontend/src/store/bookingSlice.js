import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
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
        selectAttempts: (state) => state.status.attempts,
    },
    reducers: {
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

export const { setBookingStatus, setBookingStatusState, resetBookingStatus } =
    bookingSlice.actions;

export const { selectStatus, selectAttempts, selectStatusMessage } =
    bookingSlice.selectors;
export default bookingSlice.reducer;
