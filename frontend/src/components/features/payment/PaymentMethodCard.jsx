import styles from './payment.module.css';
import Card from '@components.common/card/Card.jsx';

const PaymentMethodCard = ({ method, checked, onSelect }) => {
    return (
        <Card
            tabIndex='0'
            type='button'
            className={`${styles.payment_method} ${checked ? styles.active : ''}`}
            onClick={onSelect}
            aria-pressed={checked}>
            <div className={styles.payment_method_content}>
                <h4 className={styles.payment_method_title}>{method.title}</h4>
                <p className={styles.payment_method_description}>
                    {method.description}
                </p>
            </div>

            <div className={styles.payment_method_right}>
                <span className={styles.payment_method_price}>
                    {method.price}
                </span>

                <span className={styles.payment_method_checkbox}>
                    <input
                        type='radio'
                        checked={checked}
                        readOnly
                        tabIndex='-1'
                    />
                </span>
            </div>
        </Card>
    );
};

export default PaymentMethodCard;
