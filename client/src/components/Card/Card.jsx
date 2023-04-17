import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from'./Card.module.scss';

import { dateOptions } from '../../data/variables';

const Card = ({ poster, title, date, price, id, iso_currency }) => {
    const { t, i18n } = useTranslation();
    const locales = {
        "en": "en-US",
        "ua": "uk-UK"
    }

    const currentLocale = locales[i18n.language];

    return (
        <div className={styles.container} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${poster})`}}>
            <div className={styles.title}>
                <h3>{title}</h3>
                <span>{new Date(date).toLocaleString(currentLocale, dateOptions)}</span>
            </div>
            <div className={styles.info}>
                <Link className={styles.more_link} to={`/event/${id}`}>{t('wideCard.more')}</Link>
                <span>{price > 0 ? `${t('wideCard.price')} ${price} ${iso_currency}` : t('wideCard.free')}</span>
            </div>
        </div>
    );
};

export default Card;