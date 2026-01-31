import { createSlice } from '@reduxjs/toolkit';

const dateTimeSlice = createSlice({
    name: 'datetime',
    initialState: { date: null, time: { start: '', end: '' } },
    selectors: {
        selectDate: (state) => state.date,
        selectTime: (state) => state.time,
        selectDateTime: (state) => state,
    },
    reducers: {
        setDate(state, action) {
            state.date = action.payload.date;
        },
        setTime(state, action) {
            const actionTime = action.payload;
            state.time = { ...state.time, ...actionTime };
        },
        resetDateTime(state) {
            state.date = null;
            state.time = { start: '', end: '' };
        },
    },
});

export const { setDate, setTime, resetDateTime } = dateTimeSlice.actions;
export const { selectDate, selectTime, selectDateTime } =
    dateTimeSlice.selectors;
export default dateTimeSlice.reducer;
