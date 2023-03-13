import { Link } from 'react-router-dom';

import styles from './Menu.module.scss';

const BurgerButton = ({ links, menuOpen, setMenuOpen }) => {
    return(
        <div className={menuOpen ? `${styles.container} ${styles.active}` : styles.container}>
            <div className={styles.main}>
                <div className={styles.top}>
                    <img src="/logo.svg" alt="" />
                    <div className={styles.close_btn} onClick={() => setMenuOpen(false)}>
                        <svg focusable="true" aria-hidden="true" viewBox="0 0 24 24">
                            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </svg>
                    </div>
                </div>
                <div className={styles.content}>
                    <ul>
                        {links.map((el, index)=> (
                            <li key={index}>
                                <Link to={el.url}>{el.name}</Link>
                                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                    <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                                </svg>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BurgerButton;