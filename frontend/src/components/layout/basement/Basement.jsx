import styles from './basement.module.css';

const Basement = () => {
    return (
        <footer className={styles.footer_navbar}>
            <div className={styles.basement} id='about'>
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
            </div>
        </footer>
    );
};

export default Basement;
