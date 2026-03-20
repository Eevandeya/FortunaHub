import styles from './infoCard.module.css';
import Card from '@components.common/card/Card.jsx';

export const InfoCard = ({ title, children, ...other }) => {
    return (
        <Card
            Component='article'
            className={`${styles.card_container} ${other.className ?? ''}`}>
            <div className={styles.card_meta}>
                {title && <div className={styles.card_title}>{title}</div>}
                <div className={styles.card_content}>{children}</div>
            </div>
        </Card>
    );
};

export default InfoCard;
