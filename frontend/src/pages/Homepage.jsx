import { Link } from 'react-router-dom';
import { NavigationItem } from '@components.common/navigation/NavigationItem.jsx';
import { HashNavigationItem } from '@components.common/navigation/HashNavigationItem.jsx';
import { ROUTES } from '@root.consts/navigation.js';
import FortunaLogo from '@components.common/logo/FortunaLogo.jsx';
import BurgerButton from '../components/common/button/BurgerButton.jsx';
import MenuList from '../components/common/menu/menuList.jsx';
import { useState } from 'react';

function Homepage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
            <header>
                <nav>
                    <div className='navbar'>
                        <div className='navbar-content'>
                            <FortunaLogo
                                logoHeader='FORTUNA'
                                logoImage='/icons/Fortuna%2064x64.svg'
                                hasHeader
                            />
                        </div>
                        <div className='navbar-right'>
                            <NavigationItem to={ROUTES.HOME} end>
                                В ГЛАВНОЕ МЕНЮ
                            </NavigationItem>
                            <NavigationItem to={ROUTES.BOOKING.TIME} end>
                                ЗАБРОНИРОВАТЬ
                            </NavigationItem>
                            <HashNavigationItem to={ROUTES.ABOUT}>
                                О НАС
                            </HashNavigationItem>
                        </div>
                        <MenuList isMenuOpen={isMenuOpen}>
                            <div className='menu-list'>
                                <div className='menu-container'>
                                    <HashNavigationItem
                                        to={ROUTES.HOME_HASH}
                                        className='menu-item'
                                        onClick={() => setIsMenuOpen(false)}>
                                        Главная
                                    </HashNavigationItem>
                                </div>
                                <div className='menu-container'>
                                    <NavigationItem
                                        to={ROUTES.BOOKING.TIME}
                                        className='menu-item'>
                                        Забронировать
                                    </NavigationItem>
                                </div>
                                <div className='menu-container'>
                                    <HashNavigationItem
                                        className='menu-item'
                                        to={ROUTES.ABOUT}
                                        onClick={() => setIsMenuOpen(false)}>
                                        О нас
                                    </HashNavigationItem>
                                </div>
                            </div>
                        </MenuList>
                        <BurgerButton
                            isActive={isMenuOpen}
                            setIsActive={setIsMenuOpen}
                        />
                    </div>
                </nav>
            </header>
            <main className='homepage-container'>
                <div className='homepage-hero'>
                    <div className='hero-image-container'>
                        <img
                            alt='hero-image'
                            src='/images/16.jpg'
                            className='hero-image'
                        />
                    </div>
                    <div className='hero-overlay' />
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
                                <Link
                                    to={ROUTES.SERVICES.SAUNA}
                                    className='description-button'>
                                    Подробнее
                                </Link>
                                <Link
                                    to={ROUTES.BOOKING.TIME}
                                    className='booking-button'>
                                    Забронировать
                                </Link>
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
                                <Link
                                    to={ROUTES.SERVICES.ACCESSORIES}
                                    className='description-button'>
                                    Подробнее
                                </Link>
                                <Link
                                    to={ROUTES.BOOKING.TIME}
                                    className='booking-button'>
                                    Забронировать
                                </Link>
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
                                <Link
                                    to={ROUTES.SERVICES.GYM}
                                    className='description-button'>
                                    Подробнее
                                </Link>
                                <Link
                                    to={ROUTES.BOOKING.TIME}
                                    className='booking-button'>
                                    Забронировать
                                </Link>
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
                                <img alt='we on map' src='/images/map.png' />
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <footer>
                <div className='basement' id='about'>
                    <div>
                        <h3>О нас:</h3>
                        <p>
                            Лучшая баня для семейного отдыха или посиделок с
                            друзьями. Природа города и чистый воздух придают
                            ощущения отдыха на природе. Работаем с 2025 и имеем
                            крупный опыт в банных услугах.
                        </p>
                    </div>
                    <div>
                        <h3>Забронировать:</h3>
                        <p>Выберите время</p>
                    </div>
                    <div>
                        <h3>Наше местоположение:</h3>
                        <p>Адрес: город, улица, номер дома</p>
                        <p>Время работы: 00:00 — 08:00</p>
                    </div>
                    <div>
                        <h3>Профиль:</h3>
                        <p>Регистрация</p>
                        <p>Вход</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Homepage;
