import styles from './loader.module.css';

const Loading = () => {
    return (
        <div className={styles.loader}>
            <span className={styles.bubble} />
            <span className={styles.bubble} />
            <span className={styles.bubble} />
        </div>
    );
};

export default Loading;
