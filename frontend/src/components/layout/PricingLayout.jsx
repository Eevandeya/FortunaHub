import { Outlet } from 'react-router-dom';
import { useGetPricingQuery } from '@root.api/pricingApi.js';
import { useSelector } from 'react-redux';
import { selectPricingData } from '@store/pricingSelector.js';

const PricingLayout = ({ children }) => {
    //eslint-disable-next-line
    const pricePerHour = useGetPricingQuery();
    //eslint-disable-next-line
    const selectPriceData = useSelector(selectPricingData);

    return children;
};

export default PricingLayout;
