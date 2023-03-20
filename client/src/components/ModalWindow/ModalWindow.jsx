import { useState } from 'react';
import { Modal, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

import styles from './ModalWindow.module.scss';

const ModalWindow = ({ open, handleClose }) => {
    const { t } = useTranslation();
    const cities = t('modalWindow.cities', { returnObjects: true });
    
    const [radio, setRadio] = useState(cities.flat().find(el => el.id === +JSON.parse(localStorage.getItem('city')))?.id || cities[0][0].id);
    const matches = useMediaQuery('(max-width:800px)');

    const handleChange = (e) => {
        localStorage.setItem('city', JSON.stringify(e.target.value));
        setRadio(e.target.value);
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>{t('modalWindow.title')}</h2>
                    <div onClick={handleClose} className={styles.close_btn}>
                        <svg focusable="true" aria-hidden="true" viewBox="0 0 24 24">
                            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </svg>
                    </div>
                </div>
                <div className={styles.content}>
                    <table>
                        <tbody>
                            {matches ?
                                cities.flat().map((el, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="radio"
                                                name='city'
                                                value={el.id}
                                                id={el.id}
                                                checked={+radio === el.id}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor={el.id}>{el.city}</label>
                                        </td>
                                    </tr>   
                                )) :
                                cities.map((el, index) => (
                                    <tr key={index}>
                                        {el.map((city, index) => (
                                            <td key={index}>
                                                <input
                                                    type="radio"
                                                    name='city'
                                                    value={city.id}
                                                    id={city.id}
                                                    checked={+radio === city.id}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor={city.id}>{city.city}</label>
                                            </td>
                                        ))}
                                    </tr>   
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            </>
        </Modal>
    );
};

export default ModalWindow;