import './ServicePage.css';
import { Link } from 'react-router-dom';

export const GymServicesPage = () => {
    return (
        <>
            <main className='service-page'>
                <section className='service-hero'>
                    <div className='hero-image-container'>
                        <img
                            src='/images/10.jpg'
                            alt='Современный зал'
                            className='hero-image'
                        />
                        <div className='hero-overlay'>
                            <h1 className='hero-title'>Современный зал</h1>
                            <p className='hero-subtitle'>
                                Держите себя в тонусе даже на отдыхе
                            </p>
                        </div>
                    </div>
                </section>
                <section className='service-intro'>
                    <div className='container'>
                        <h2>Lorem impsum?</h2>
                        <p className='intro-text'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Cras auctor justo eros, vel porttitor sem
                            porta et. Suspendisse pharetra diam congue tellus
                            sagittis ultrices. Integer commodo, nisi ut
                            condimentum condimentum.
                        </p>
                    </div>
                </section>
                <section className='service-details'>
                    <div className='container'>
                        <h2>Детали услуги</h2>
                        <div className='details-grid'>
                            <div className='detail-card'>
                                <div className='card-icon'>🔥</div>
                                <h3>Lorem Ipsum</h3>
                                <p>Lorem Ipsum</p>
                                <span className='card-meta'>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.
                                </span>
                            </div>
                            <div className='detail-card'>
                                <div className='card-icon'>🔥</div>
                                <h3>Lorem Ipsum</h3>
                                <p>Lorem Ipsum</p>
                                <span className='card-meta'>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.
                                </span>
                            </div>
                            <div className='detail-card'>
                                <div className='card-icon'>🔥</div>
                                <h3>Lorem Ipsum</h3>
                                <p>Lorem Ipsum</p>
                                <span className='card-meta'>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.
                                </span>
                            </div>
                            <div className='detail-card'>
                                <div className='card-icon'>🔥</div>
                                <h3>Lorem Ipsum</h3>
                                <p>Lorem Ipsum</p>
                                <span className='card-meta'>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.
                                </span>
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
                                    src='/images/9.jpg'
                                    alt='picture'
                                    loading='lazy'
                                />
                            </div>
                            <div className='gallery-item' role='button'>
                                <img
                                    src='/images/10.jpg'
                                    alt='picture'
                                    loading='lazy'
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className='service-cta'>
                    <div className='container'>
                        <h2>Lorem Ipsum</h2>
                        <p>Lorem Ipsum</p>
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
