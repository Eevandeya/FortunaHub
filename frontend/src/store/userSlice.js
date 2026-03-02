import { createSlice } from '@reduxjs/toolkit';
import { CONTACT_METHODS } from '@root.consts/contactMethods.js';

const initialData = {
    customer: { nickname: '', phoneNumber: '' },
    visitorsCount: 0,
    preferredContactMethod: CONTACT_METHODS[0],
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialData,
    selectors: {
        selectUserInfo: (state) => state.customer,
        selectVisitorsCount: (state) => state.visitorsCount,
        selectContactMethod: (state) => state.preferredContactMethod,
        selectUserData: (state) => ({
            customer: state.customer,
            visitors: state.visitorsCount,
            contactMethod: state.preferredContactMethod,
        }),
    },
    reducers: {
        setUserInfo(state, action) {
            const customerData = action.payload.customer;
            state.customer = { ...state.customer, ...customerData };
        },
        setVisitorsCount(state, action) {
            state.visitorsCount = action.payload.visitorsCount;
        },
        setPreferredContactMethod(state, action) {
            state.preferredContactMethod =
                action.payload.preferredContactMethod;
        },
        resetUser(state) {
            state.customer = initialData.customer;
            state.visitorsCount = initialData.visitorsCount;
            state.preferredContactMethod = initialData.preferredContactMethod;
        },
    },
});

export const {
    selectUserInfo,
    selectVisitorsCount,
    selectContactMethod,
    selectUserData,
} = userSlice.selectors;
export const {
    setUserInfo,
    setVisitorsCount,
    setPreferredContactMethod,
    resetUser,
} = userSlice.actions;
export default userSlice.reducer;
