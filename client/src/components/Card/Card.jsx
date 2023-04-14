import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from'./Card.module.scss';

import { dateOptions } from '../../data/variables';

const Card = ({ poster, title, date, price, id }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.container} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${poster})`}}>
            <div className={styles.title}>
                <h3>{title}</h3>
                <span>{new Date(date).toLocaleString('uk-UK', dateOptions).toUpperCase().slice(0, -3)}</span>
            </div>
            <div className={styles.info}>
                <Link className={styles.more_link} to={`/event/${id}`}>{t('wideCard.more')}</Link>
                <span>{`${t('wideCard.price')} ${price} ₴`}</span>
            </div>
        </div>
    );
};

export default Card;