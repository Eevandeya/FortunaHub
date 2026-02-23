import styles from './basement.module.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../consts/navigation.js';
import useScrollNavigate from '../../../hooks/useScrollNavigate.js';
import { HashNavigationLink } from '../../common/link/HashNavigationLink.jsx';
import { useGetSaunaConfigQuery } from '../../../../api/saunaConfig.js';

const Basement = () => {
    const scroll = useScrollNavigate();
    const config = useGetSaunaConfigQuery();

    return (
        <footer className={styles.footer_navbar}>
            <div className={styles.basement} id='about'>
                <section className={styles.basement_text}>
                    <div className={styles.text_block}>
                        <h5>О бане:</h5>
                        <p>
                            О нас: Лучшая баня для семейного отдыха или
                            посиделок с друзьями. Природа города и чистый воздух
                            придают ощущения отдыха на природе. Работаем с 2025
                            и имеем крупный опыт в банных услугах.
                        </p>
                        <Link to={ROUTES.BOOKING.TIME}>
                            <p>Забронировать</p>
                        </Link>
                        <Link to={ROUTES.PRICE}>
                            <p>Цены</p>
                        </Link>
                        <Link to={ROUTES.GALLERY}>
                            <p>Галлерея</p>
                        </Link>
                    </div>
                    <div className={styles.text_block}>
                        <h5>Наше местоположение:</h5>
                        <HashNavigationLink onClick={() => scroll('/', 'map')}>
                            Адрес: город, улица, номер дома
                            <br />
                            Время работы: {config.data?.opening_time}—
                            {config.data?.closing_time}
                        </HashNavigationLink>
                    </div>
                    <div className={styles.text_block}>
                        <h5>Контакты:</h5>
                        <p>1-й номер телефона: + 7 777 777 77 77</p>
                    </div>
                </section>
                <section className={styles.basement_connect}>
                    <h5>Наши соцсети:</h5>
                    <h5>Свяжитесь с нами:</h5>
                </section>
            </div>
        </footer>
    );
};

export default Basement;
