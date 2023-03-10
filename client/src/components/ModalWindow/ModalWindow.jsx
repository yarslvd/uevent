import { useState } from 'react';
import { Modal, useMediaQuery } from '@mui/material';

import styles from './ModalWindow.module.scss';
import { cities } from '../../data/variables';

const ModalWindow = ({ open, handleClose }) => {
    const [radio, setRadio] = useState(cities.flat().find(el => el === JSON.parse(localStorage.getItem('city'))) ||'Харків');
    const matches = useMediaQuery('(max-width:800px)');
    console.log(radio);

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
                    <h2>Оберіть місто</h2>
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
                                                value={el}
                                                id={el}
                                                checked={radio === el}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor={el}>{el}</label>
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
                                                    value={city}
                                                    id={city}
                                                    checked={radio === city}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor={city}>{city}</label>
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