import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '@root.consts/navigation.js';
import MainWindowSlider from '../components/common/slider/MainWindowSlider.jsx';
import YandexStaticMap from '../components/features/staticMap/YandexStaticMap.jsx';
import Button from '../components/common/button/Button.jsx';
import GoToButton from '../components/common/button/GoToButton.jsx';

function Homepage() {
    const navigate = useNavigate();
    return (
        <>
            <main className='homepage-container'>
                <div id='hero' className='homepage-hero'>
                    <MainWindowSlider />
                </div>
                <div className='homepage-description'>
                    <h2>Баня на свежем воздухе</h2>
                    <section className='homepage-description-block'>
                        <div className='image-container'>
                            <div className='image-16-9'>
                                <img alt='Фото бани' src='/images/17.jpg' />
                            </div>
                        </div>
                        <div className='description-container'>
                            <div className='description-block'>
                                <h3>Жаркая банька</h3>
                                <details className='homepage-service-details'>
                                    <summary className='details-title'>
                                        Жар раскаленных камней и аромат банных
                                        веников позволят насладится атмосферой
                                        бани
                                    </summary>
                                    <div className='details-content'>
                                        <ul className='details-list'>
                                            <li className='details-list-item'>
                                                Беговая дорожка
                                            </li>
                                            <li className='details-list-item'>
                                                Гантели весом 1-32кг
                                            </li>
                                            <li className='details-list-item'>
                                                Скамья для жима
                                            </li>
                                        </ul>
                                    </div>
                                </details>

                                <a>
                                    <span>Мы на карте</span>
                                </a>
                            </div>
                            <div className='btn-combine-left'>
                                <GoToButton
                                    onClick={() =>
                                        navigate(ROUTES.SERVICES.SAUNA)
                                    }
                                    className='description-button'
                                    value='Подробнее'
                                    theme='black'
                                />
                                <GoToButton
                                    onClick={() =>
                                        navigate(ROUTES.BOOKING.TIME)
                                    }
                                    className='booking-button'
                                    value='Забронировать'
                                />
                            </div>
                        </div>
                    </section>
                    <section className='homepage-description-block'>
                        <div className='image-container'>
                            <div className='image-16-9'>
                                <img alt='Фото бани' src='/images/14.jpg' />
                            </div>
                        </div>
                        <div className='description-container'>
                            <div className='description-block'>
                                <h3>Юутные халаты</h3>
                                <details className='homepage-service-details'>
                                    <summary className='details-title'>
                                        Мягкие и уютные халаты помогут
                                        расслабиться и отвлечься от суеты
                                    </summary>
                                    <div className='details-content'>
                                        <ul className='details-list'>
                                            <li className='details-list-item'>
                                                Беговая дорожка
                                            </li>
                                            <li className='details-list-item'>
                                                Гантели весом 1-32кг
                                            </li>
                                            <li className='details-list-item'>
                                                Скамья для жима
                                            </li>
                                        </ul>
                                    </div>
                                </details>
                                <a>
                                    <span>Мы на карте</span>
                                </a>
                            </div>
                            <div className='btn-combine-left'>
                                <GoToButton
                                    onClick={() =>
                                        navigate(ROUTES.SERVICES.SAUNA)
                                    }
                                    className='description-button'
                                    value='Подробнее'
                                    theme='black'
                                />
                                <GoToButton
                                    onClick={() =>
                                        navigate(ROUTES.BOOKING.TIME)
                                    }
                                    className='booking-button'
                                    value='Забронировать'
                                />
                            </div>
                        </div>
                    </section>
                    <section className='homepage-description-block'>
                        <div className='image-container'>
                            <div className='image-16-9'>
                                <img alt='Фото бани' src='/images/9.jpg' />
                            </div>
                        </div>
                        <div className='description-container'>
                            <div className='description-block'>
                                <h3>Спортзальчик</h3>
                                <details className='homepage-service-details'>
                                    <summary className='details-title'>
                                        Воспользуйтесь нашим залом
                                    </summary>
                                    <div className='details-content'>
                                        <ul className='details-list'>
                                            <li className='details-list-item'>
                                                Беговая дорожка
                                            </li>
                                            <li className='details-list-item'>
                                                Гантели весом 1-32кг
                                            </li>
                                            <li className='details-list-item'>
                                                Скамья для жима
                                            </li>
                                        </ul>
                                    </div>
                                </details>
                                <a>
                                    <span>Мы на карте</span>
                                </a>
                            </div>
                            <div className='btn-combine-left'>
                                <GoToButton
                                    onClick={() =>
                                        navigate(ROUTES.SERVICES.GYM)
                                    }
                                    className='description-button'
                                    value='Подробнее'
                                    theme='black'
                                />
                                <GoToButton
                                    onClick={() =>
                                        navigate(ROUTES.BOOKING.TIME)
                                    }
                                    className='booking-button'
                                    value='Забронировать'
                                />
                            </div>
                        </div>
                    </section>
                </div>
                <div className='homepage-map'>
                    <h2>Мы на карте</h2>
                    <section className='homepage-map-block'>
                        <div className='map-text-block'>
                            <h3>Сведения</h3>
                            <h4>Lorem Ipsum Lorem Ipsum</h4>
                            <h4>Lorem Ipsum</h4>
                            <h4>Lorem Ipsum</h4>
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
