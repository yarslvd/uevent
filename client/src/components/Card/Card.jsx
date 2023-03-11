import { Link } from 'react-router-dom';

import styles from'./Card.module.scss';

const Card = ({ image_url, title, location, time, date, price }) => {
    return (
        <div className={styles.container} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${image_url})`}}>
            <div className={styles.title}>
                <h3>{title}</h3>
                <span>{date}</span>
            </div>
            <div className={styles.info}>
                <Link className={styles.more_link} to={`/events/${title}`}>Більше</Link>
                <span>Від {price}грн.</span>
            </div>
        </div>
    );
};

export default Card;