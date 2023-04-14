import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, Button } from '@mui/material';

import styles from './EventInfo.module.scss';

import BuyTicketModal from '../BuyTicketModal/BuyTicketModal';
import ShowVisitorsModal from '../ShowVisitorsModal/ShowVisitorsModal';
import { dateOptions, timeOptions } from '../../data/variables';
import {useGetEventTicketsQuery, useGetTicketsQuery, useLazyBuyTicketsQuery} from '../../redux/api/fetchTicketsApi';
import { useAddFavouriteMutation } from '../../redux/api/fetchFavouritesApi';
import { useDeleteFavouriteMutation } from '../../redux/api/fetchFavouritesApi';
import { useGetFavouriteOneQuery } from '../../redux/api/fetchFavouritesApi';
import { useGetFavouritesQuery } from '../../redux/api/fetchFavouritesApi';
import { useLazyCheckPaymentQuery } from '../../redux/api/fetchPaymentApi';

// Implement follow/unfollow

const EventInfo = ({ title, date, iso_currency, location, organizer_id, price, ticket_amount, isLoading, error, organizer, visibility }) => {
    const { id } = useParams();
    const { data } = useGetFavouriteOneQuery(id);

    const [isLikeActive, setIsLikeActive] = useState(data ? true : false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalUsersOpen, setModalUsersOpen] = useState(false);

    const parsedDate = !isLoading && new Date(date);

    const [addFavourite] = useAddFavouriteMutation();
    const [deleteFavourite] = useDeleteFavouriteMutation();
    const { refetch } = useGetFavouritesQuery();
    const { isLoading: isLoadingTickets, data: dataTickets, error: errorTickets } = useGetEventTicketsQuery({event_id:id});
    // console.log(visibility);

    //console.log(isLoadingTickets, dataTickets, errorTickets)

    //fetch data of organization by id;

    const handleClose = () => {
        setModalOpen(false);
    };
    
    const handleUsersClose = () => {
        setModalUsersOpen(false);
    }

    const handleLike =  () => {
        setIsLikeActive(!isLikeActive);
        const event_id = +id;

        if(!isLikeActive) {
            console.log('add');
            addFavourite({event_id})
                .unwrap()
                .then(() => {
                    refetch();
                })
        }
        else {
            console.log('delete');
            deleteFavourite(event_id).unwrap();
        }
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
                        <Link to={`/organization/${organizer_id}`}>{!isLoading && !error && organizer?.name}</Link>
                    </div>
                    <div className={styles.item}>
                        <img src="/assets/price_black_icon.png" alt="Location" />
                        <span>{!isLoading && !error && `${price} ${iso_currency}`}</span>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                {!errorTickets && !isLoadingTickets && visibility != 'private' &&
                    <div className={styles.visitors}>
                        <span>Підуть</span>
                        <div className={styles.avatars}>
                            {[...new Set(dataTickets?.tickets.map(el => JSON.stringify(el)))].map((el, index) => {
                                el = JSON.parse(el);
                                if (index < 18 && el.can_show) {
                                    return <Link to={`/user/${el.user.id}`} key={index}>
                                        <Avatar
                                            alt={el.user.first_name+el.user.last_name}
                                            src={el.user.image?el.user.image:`/static/images/avatar/1.jpg`}
                                            className={styles.avatar}
                                        />
                                    </Link>
                                }
                            })}
                            {dataTickets.tickets.length > 1 && <div onClick={() => setModalUsersOpen(true)} className={styles.moreVisitors}>ще</div>}
                            <ShowVisitorsModal
                                open={modalUsersOpen}
                                handleClose={handleUsersClose}
                                tickets={!isLoadingTickets && dataTickets.tickets}
                                isLoading={isLoadingTickets}
                            />
                        </div>
                    </div>
                }
                <div className={styles.button_section}>
                    <Button variant='contained' onClick={() => setModalOpen(true)} className={styles.buy_btn}>Купити</Button>
                    <BuyTicketModal
                        open={modalOpen}
                        handleClose={handleClose}
                        price={price}
                        iso_currency={iso_currency}
                    />
                    <motion.div 
                        className={styles.like_btn}
                        whileTap={{ scale: 0.8 }}
                        onClick={handleLike}
                    >
                        <img src={isLikeActive ? "/assets/heart_filled_icon.png" : "/assets/heart_empty_icon.png"} alt="Like Event" />
                    </motion.div>
                </div>
            </div>
        </div>
    )
};

export default EventInfo;