import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery, FormControl, Select, MenuItem } from '@mui/material';
import { useTranslation } from "react-i18next";

import ModalWindow from '../ModalWindow/ModalWindow';
import SearchBarSimple from '../SearchBarSimple/SearchBarSimple';

import styles from './Menu.module.scss';

const Menu = ({ menuOpen, setMenuOpen }) => {
    const { t, i18n } = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);
    const [language, setLanguage] = useState(JSON.parse(localStorage.getItem('lang')) || 'ua');
    const matches = useMediaQuery('(max-width:1000px)');
    const matchesSearch = useMediaQuery('(max-width:650px)');

    const menu = t('menu.items', { returnObjects: true });
    const cities = t('modalWindow.cities', { returnObjects: true });

    const changeLang = (e) => {
        setLanguage(e.target.value);
        localStorage.setItem('lang', JSON.stringify(e.target.value));
    }

    const handleClose = () => {
        setModalOpen(false);
    }

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    return(
        <div className={menuOpen ? `${styles.container} ${styles.active}` : styles.container}>
            <div className={styles.main}>
                <div className={styles.top}>
                    <img src="/logo.svg" alt="" />
                    {matches && <div className={styles.location} onClick={() => setModalOpen(true)} tabIndex="0">
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LocationOnIcon">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                        </svg>
                        <span>{cities.flat().find(el => el === JSON.parse(localStorage.getItem('city'))) || 'Харків'}</span>
                    </div>}
                    <ModalWindow open={modalOpen} handleClose={handleClose} />
                    <div className={styles.close_btn} onClick={() => setMenuOpen(false)}>
                        <svg focusable="true" aria-hidden="true" viewBox="0 0 24 24">
                            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </svg>
                    </div>
                </div>
                <div className={styles.content}>
                    <ul>
                        {menu.map((el, index)=> (
                            <li key={index}>
                                <Link to={el.url} onClick={() => setMenuOpen(false)}>
                                    {el.name}
                                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                                        <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                                    </svg>
                                </Link>
                            </li>
                        ))}
                        {matchesSearch && <SearchBarSimple />}
                    </ul>
                    <div className={styles.bottom}>
                        {matches && <Link to={'login'} className='login'>{t('menu.login')}</Link>}
                        <FormControl sx={{ m: 1 }} variant="standard">
                            <Select
                                labelId="change-language"
                                id="demo-customized-select"
                                value={language}
                                onChange={changeLang}
                            >
                                <MenuItem value={'ua'}>
                                    <img src="/assets/ukraine-flag-icon.png" alt="Ukranian language" className={styles.flag} width='30px' />
                                </MenuItem>
                                <MenuItem value={'en'}>
                                    <img src="/assets/united-kingdom-flag-icon.png" alt="English language" className={styles.flag} width='30px' />
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menu;