import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@root.consts/navigation.js';
import MainWindowSlider from '../components/common/slider/MainWindowSlider.jsx';
import YandexStaticMap from '../components/features/staticMap/YandexStaticMap.jsx';
import GoToButton from '../components/common/button/GoToButton.jsx';
import GallerySlider from '../components/common/slider/GallerySlider/GallerySlider.jsx';
import ProductSlider from '../components/common/slider/ProductSlider/ProductSlider.jsx';
import useScrollOnRoute from '../hooks/useScrollOnRoute.js';
import { useGetGalleryImagesQuery } from '../../api/galleryApi.js';

function Homepage() {
    const navigate = useNavigate();
    useScrollOnRoute();

    const { data: images } = useGetGalleryImagesQuery();

    return (
        <>
            <main className='homepage-container' id='main'>
                <div id='hero' className='homepage-hero'>
                    <MainWindowSlider />
                </div>
                <div className='homepage-content'>
                    <div className='homepage-description'>
                        <h2>Баня на свежем воздухе</h2>
                        <section className='homepage-description-block'>
                            <div className='image-container'>
                                <img
                                    alt={images && images[1].display_name}
                                    src={`${import.meta.env.VITE_BACKEND_API_URL}${images && images[1].image}`}
                                />
                            </div>
                            <div className='description-container'>
                                <div className='description-block'>
                                    <p className='description-text'>
                                        Жар раскаленных камней и аромат банных
                                        веников позволят насладится атмосферой
                                        бани
                                    </p>
                                    <details
                                        className='homepage-service-details'
                                        open>
                                        <summary className='details-title'>
                                            Что внутри
                                        </summary>
                                        <div className='details-content'>
                                            <ul className='details-list'>
                                                <li className='details-list-item'>
                                                    Русская баня с каменкой
                                                </li>
                                                <li className='details-list-item'>
                                                    Спортивный зал
                                                </li>
                                                <li className='details-list-item'>
                                                    Небольшая кухня
                                                </li>
                                                <li className='details-list-item'>
                                                    Душевые кабины
                                                </li>
                                            </ul>
                                        </div>
                                    </details>
                                </div>
                                <div className='btn-combine-left'>
                                    <GoToButton
                                        onClick={() => navigate(ROUTES.PRICE)}
                                        value='Посмотреть цены'
                                        theme='white'
                                    />
                                    <GoToButton
                                        onClick={() =>
                                            navigate(ROUTES.BOOKING.TIME)
                                        }
                                        value='Забронировать'
                                        theme='black'
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className='homepage-gallery'>
                        <h2>Загляните к нам в галерею</h2>
                        <GallerySlider />
                        <GoToButton
                            theme='white'
                            value='В галерею'
                            onClick={() => navigate(ROUTES.GALLERY)}
                        />
                    </div>
                    <div className='homepage-product'>
                        <h2>Каталог товаров</h2>
                        <ProductSlider />
                    </div>
                </div>
                <div className='homepage-map' id='map'>
                    <h2>Мы на карте</h2>
                    <section className='homepage-map-block'>
                        <div className='content-container'>
                            <img
                                src='/images/bath_entrance.png'
                                alt='Вход в баню'
                            />
                            <div className='map-text-block'>
                                <h3>Сведения</h3>
                                <h4>Lorem Ipsum Lorem Ipsum</h4>
                                <h4>Lorem Ipsum</h4>
                                <h4>Lorem Ipsum</h4>
                            </div>
                        </div>
                        <div className='image-container'>
                            <div className='image-1-1'>
                                <YandexStaticMap
                                    center='29.704511,60.190389'
                                    size='450,450'
                                    lang='ru_RU'
                                    alt='Карта'
                                    scale='1.5'
                                    zoom='15'
                                    points={['29.704511,60.190389,pm2rdm']}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Homepage;
