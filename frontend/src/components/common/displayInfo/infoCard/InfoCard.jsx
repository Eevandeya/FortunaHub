import styles from './infoCard.module.css';
import Card from '@components.common/card/Card.jsx';

export const InfoCard = ({ title, children }) => {
    return (
        <Card Component='article' className={styles.card_container}>
            <div className={styles.card_meta}>
                {title && (
                    <div className={styles.card_title}>
                        <h3>{title}</h3>
                    </div>
                )}
                <div className={styles.card_content}>{children}</div>
            </div>
        </Card>
    );
};

export default InfoCard;
