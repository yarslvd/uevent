import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, Button } from '@mui/material';

import styles from './EventInfo.module.scss';

import { dateOptions, timeOptions } from '../../data/variables';
import { useLazyBuyTicketsQuery } from '../../redux/api/fetchTicketsApi';
import { useLazyCheckPaymentQuery } from '../../redux/api/fetchPaymentApi';

// Implement follow/unfollow

const EventInfo = ({ title, date, iso_currency, location, organizer_id, price, ticket_amount, isLoading, error, organizer }) => {
    const [isLikeActive, setIsLikeActive] = useState(false);
    const parsedDate = !isLoading && new Date(date);

    const [buyTickets] = useLazyBuyTicketsQuery();
    const { id } = useParams();

    //fetch data of organization by id;

    const handlePayment = async (e) => {
        e.preventDefault();
        
        const ticket = {
            event_id: +id,
            count: 1,
            redirect_url: window.location.href + '?check-payment=true'
        }
        const payment = await buyTickets(ticket).unwrap();
 
        e.target[1].value = payment.data;
        e.target[2].value = payment.signature;
        e.target.submit();
        return true;
    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.time}>
                    <div className={styles.date}>
                        {/* //{parsedDate.getDate()} */}
                        <span>{!isLoading && !error && parsedDate.toLocaleString('uk-UK', dateOptions).toUpperCase().slice(0, -3)}</span>
                    </div>
                    <div className={styles.clock}>
                        <img src="/assets/clock_icon.png" alt="Time" />
                        <span>
                            {!isLoading && !error && parsedDate.toLocaleString('uk-UK', timeOptions)}
                        </span>
                    </div>
                </div>
                <div className={styles.title}>
                    <h1>{!isLoading && !error && title}</h1>
                    {/* <div onClick={() => console.log('Implement follow/unfollow')}><img src="/assets/follow_icon.png" alt="Follow event" /></div> */}
                </div>
                <div className={styles.details}>
                    <div className={styles.item}>
                        <img src="/assets/location_black_icon.png" alt="Location" />
                        <span>{!isLoading && !error && location}</span>
                    </div>
                    <div className={styles.item}>
                        <img src="/assets/user_black_icon.png" alt="Company" />
                        <Link to={`/organizers/id`}>{!isLoading && !error && organizer?.name}</Link>
                    </div>
                    <div className={styles.item}>
                        <img src="/assets/price_black_icon.png" alt="Location" />
                        <span>{!isLoading && !error && `${price} ${iso_currency}`}</span>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.visitors}>
                    <span>Підуть</span>
                    <div className={styles.avatars}>
                        {Array.from({ length: 19 }).map((_, index) => (
                            <Link to={'/user/efe'} key={index}><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={styles.avatar}/></Link>
                        ))}
                        <div onClick={() => console.log('Open modal with users who going to event')} className={styles.moreVisitors}>ще</div>
                    </div>
                </div>
                <div className={styles.button_section}>
                    <form method="POST" action="https://www.liqpay.ua/api/3/checkout" onSubmit={handlePayment} acceptCharset="utf-8">
                        <Button variant='contained' type='submit' className={styles.buy_btn}>Купити</Button>
                        <input type="hidden" name="data" value=""/>
                        <input type="hidden" name="signature" value=""/>
                    </form>
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