import styles from './ModalWindow.module.scss';

const ModalWindow = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Оберіть місто</h2>
            </div>
        </div>
    );
};

export default ModalWindow;