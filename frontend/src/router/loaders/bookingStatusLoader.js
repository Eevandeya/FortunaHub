import store from '@store/reduxStore.js';
import bookingStatusApi from '@root.api/bookingStatusApi.js';

const bookingStatusLoader = async ({ params }) => {
    const { orderNumber } = params;

    try {
        const response = await store
            .dispatch(
                bookingStatusApi.endpoints.getBookingStatus.initiate(
                    orderNumber,
                    { subscribe: false, forceRefetch: true }
                )
            )
            .unwrap();

        return response?.data;
    } catch (error) {
        throw new Response(
            JSON.stringify({ message: error.message, code: error.code }),
            { status: error.status }
        );
    }
};

export default bookingStatusLoader;
