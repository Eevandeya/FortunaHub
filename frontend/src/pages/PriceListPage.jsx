import usePriceList from '@hooks/usePriceList.js';

const PriceListPage = () => {
    const priceList = usePriceList();

    return (
        <div className='container'>
            <h2>Прайс лист</h2>
            <div className='price-list'>
                {priceList().map((el) => (
                    <section key={el?.category} className='price-category'>
                        <h5 className='category-title'>{el.category}</h5>
                        {el.data?.length > 0 &&
                            el.data.map((data) => {
                                return (
                                    <div
                                        key={data?.name + toString(data?.price)}
                                        className='category-el'>
                                        <h5>
                                            {data.name}
                                            {data.type ? `(${data.type})` : ''}
                                        </h5>
                                        <h5>{data.price}руб</h5>
                                    </div>
                                );
                            })}
                    </section>
                ))}
            </div>
        </div>
    );
};

export default PriceListPage;
