import './ServicePage.css';
import { Link } from 'react-router-dom';
import { NavigationItem } from '@components.common/navigation/NavigationItem.jsx';
import { HashNavigationItem } from '@components.common/navigation/HashNavigationItem.jsx';
import { ROUTES } from '@root.consts/navigation.js';
import FortunaLogo from '@components.common/logo/FortunaLogo.jsx';
import BurgerButton from '@components.common/button/BurgerButton.jsx';
import MenuList from '@components.common/menu/menuList.jsx';
import { useState } from 'react';
export const SaunaServicesPage = () => {
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
            <main className='service-page'>
                <section className='service-hero'>
                    <div className='hero-image-container'>
                        <img
                            src='/images/16.jpg'
                            alt='Русская баня с каменкой'
                            className='hero-image'
                        />
                        <div className='hero-overlay'>
                            <h1 className='hero-title'>
                                Русская баня с каменкой
                            </h1>
                            <p className='hero-subtitle'>
                                Аутентичный пар и аромат дубовых веников
                            </p>
                        </div>
                    </div>
                </section>
                <section className='service-intro'>
                    <div className='container'>
                        <h2>Что такое русская баня?</h2>
                        <p className='intro-text'>
                            Наша русская баня — это не просто помещение с паром,
                            это целая философия отдыха. Температура 70-90°C и
                            контролируемая влажность создают идеальный
                            микроклимат для глубокого прогрева и детоксикации.
                        </p>
                    </div>
                </section>
                <section className='service-details'>
                    <div className='container'>
                        <h2>Детали услуги</h2>
                        <div className='details-grid'>
                            <div className='detail-card'>
                                <div className='card-icon'>🔥</div>
                                <h3>Температурный режим</h3>
                                <p>70-90°C с возможностью регулировки</p>
                                <span className='card-meta'>
                                    Идеально для новичков и опытных
                                </span>
                            </div>

                            <div className='detail-card'>
                                <div className='card-icon'>⏱️</div>
                                <h3>Время сеанса</h3>
                                <p>2 часа стандартно + 30 минут на остывание</p>
                                <span className='card-meta'>
                                    Можно продлить
                                </span>
                            </div>

                            <div className='detail-card'>
                                <div className='card-icon'>👥</div>
                                <h3>Вместимость</h3>
                                <p>До 5 человек одновременно</p>
                                <span className='card-meta'>
                                    Идеально для компании
                                </span>
                            </div>

                            <div className='detail-card'>
                                <div className='card-icon'>🌿</div>
                                <h3>Дополнительно</h3>
                                <p>Ароматические масла, травяные настои</p>
                                <span className='card-meta'>Бесплатно</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='service-gallery'>
                    <div className='container'>
                        <h2>Фотогалерея</h2>
                        <div className='gallery-grid'>
                            <div className='gallery-item' role='button'>
                                <img
                                    src='/images/1.jpg'
                                    alt='picture'
                                    loading='lazy'
                                />
                            </div>
                            <div className='gallery-item' role='button'>
                                <img
                                    src='/images/2.jpg'
                                    alt='picture'
                                    loading='lazy'
                                />
                            </div>
                            <div className='gallery-item' role='button'>
                                <img
                                    src='/images/3.jpg'
                                    alt='picture'
                                    loading='lazy'
                                />
                            </div>
                            <div className='gallery-item' role='button'>
                                <img
                                    src='/images/15.jpg'
                                    alt='picture'
                                    loading='lazy'
                                />
                            </div>
                            <div className='gallery-item' role='button'>
                                <img
                                    src='/images/16.jpg'
                                    alt='picture'
                                    loading='lazy'
                                />
                            </div>
                            <div className='gallery-item' role='button'>
                                <img
                                    src='/images/17.jpg'
                                    alt='picture'
                                    loading='lazy'
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className='service-cta'>
                    <div className='container'>
                        <h2>Готовы попариться?</h2>
                        <p>Забронируйте баню прямо сейчас</p>
                        <div className='cta-buttons'>
                            <Link to='/' className='cta-button primary'>
                                Забронировать онлайн
                            </Link>
                            <Link to='/' className='cta-button secondary'>
                                Посмотреть цены
                            </Link>
                        </div>
                    </div>
                </section>
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
};
