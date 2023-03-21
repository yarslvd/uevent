import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, Button } from '@mui/material';

import styles from './EventInfo.module.scss';

// Implement follow/unfollow

const EventInfo = () => {
    const [isLikeActive, setIsLikeActive] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.time}>
                    <div className={styles.date}>
                        12 БЕР 2023
                    </div>
                    <div className={styles.clock}>
                        <img src="/assets/clock_icon.png" alt="Time" />
                        <span>18:00</span>
                    </div>
                </div>
                <div className={styles.title}>
                    <h1>Harry Styles</h1>
                    <div onClick={() => console.log('Implement follow/unfollow')}><img src="/assets/follow_icon.png" alt="Follow event" /></div>
                </div>
                <div className={styles.details}>
                    <div className={styles.item}>
                        <img src="/assets/location_black_icon.png" alt="Location" />
                        <a href='https://www.google.com/maps/place/Students+Palace+of+NTU+KhPI/@50.0067693,36.2481787,17.75z/data=!4m6!3m5!1s0x4127a0db465c2141:0xc08366351bcbc4a6!8m2!3d50.0067437!4d36.2490521!16s%2Fg%2F11r91b2l1' target='_blank' rel="noreferrer">Палац студентів НТУ “ХПІ”</a>
                    </div>
                    <div className={styles.item}>
                        <img src="/assets/user_black_icon.png" alt="Company" />
                        <Link>FIRST Concert Agency</Link>
                    </div>
                    <div className={styles.item}>
                        <img src="/assets/price_black_icon.png" alt="Location" />
                        <span>Від 450 грн.</span>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.visitors}>
                    <span>Підуть</span>
                    <div className={styles.avatars}>
                        {Array.from({ length: 19 }).map((_, index) => (
                            <Link to={'/user/efe'}><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={styles.avatar}/></Link>
                        ))}
                        <div onClick={() => console.log('Open modal with users who going to event')} className={styles.moreVisitors}>ще</div>
                    </div>
                </div>
                <div className={styles.button_section}>
                    <Button variant='contained' className={styles.buy_btn}>Купити</Button>
                    <motion.div 
                        className={styles.like_btn}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setIsLikeActive(!isLikeActive)}
                    >
                        <img src={isLikeActive ? "/assets/heart_filled_icon.png" : "/assets/heart_empty_icon.png"} alt="Like Event" />
                    </motion.div>
                </div>
            </div>
        </div>
    )
};

export default EventInfo;