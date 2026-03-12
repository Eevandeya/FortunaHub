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

        return response;
    } catch (error) {
        throw new Response(
            JSON.stringify({
                message: error.data?.message,
                code: error.data?.code,
            }),
            { status: 500 }
        );
    }
};

export default bookingStatusLoader;
