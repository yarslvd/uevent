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
import { useTranslation } from 'react-i18next';

// Implement follow/unfollow

const EventInfo = ({ title, date, iso_currency, location, organizer_id, price, ticket_amount, isLoading, error, organizer, visibility }) => {
    const { id } = useParams();
    const { data } = useGetFavouriteOneQuery(id);
    const { t, i18n } = useTranslation();
    const locales = {
        "en": "en-US",
        "ua": "uk-UK"
    }

    const currentLocale = locales[i18n.language];

    const [isLikeActive, setIsLikeActive] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalUsersOpen, setModalUsersOpen] = useState(false);

    const parsedDate = !isLoading && new Date(date);

    const [addFavourite] = useAddFavouriteMutation();
    const [deleteFavourite] = useDeleteFavouriteMutation();
    const { refetch } = useGetFavouritesQuery();
    const { isLoading: isLoadingTickets, data: dataTickets, error: errorTickets } = useGetEventTicketsQuery({event_id:id});

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
            addFavourite({event_id})
                .unwrap()
                .then(() => {
                    refetch();
                })
        }
        else {
            deleteFavourite(event_id).unwrap();
        }
    }

    useEffect(() => {
        if(data?.favourite != null) {
            setIsLikeActive(true);
        }
    }, [data]);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.time}>
                    <div className={styles.date}>
                        {/* //{parsedDate.getDate()} */}
                        <span>{!isLoading && !error && parsedDate.toLocaleString(currentLocale, dateOptions)}</span>
                    </div>
                    <div className={styles.clock}>
                        <img src="/assets/clock_icon.png" alt="Time" className={styles.icon} />
                        <span>
                            {!isLoading && !error && parsedDate.toLocaleString(currentLocale, timeOptions)}
                        </span>
                    </div>
                </div>
                <div className={styles.title}>
                    <h1>{!isLoading && !error && title}</h1>
                    {/* <div onClick={() => console.log('Implement follow/unfollow')}><img src="/assets/follow_icon.png" alt="Follow event" /></div> */}
                </div>
                <div className={styles.details}>
                    <div className={styles.item}>
                        <img src="/assets/location_black_icon.png" alt="Location" className={styles.icon} />
                        <span>{!isLoading && !error && location}</span>
                    </div>
                    <div className={styles.item}>
                        <img src="/assets/user_black_icon.png" alt="Company" className={styles.icon} />
                        <Link to={`/organization/${organizer_id}`}>{!isLoading && !error && organizer?.name}</Link>
                    </div>
                    <div className={styles.item}>
                        <img src="/assets/price_black_icon.png" alt="Location" className={styles.icon} />
                        <span>{!isLoading && !error && price != 0 ? `${price} ${iso_currency}` : t('eventPage.eventDetails.free')}</span>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                {!errorTickets && !isLoadingTickets && visibility !== 'private' &&
                    <div className={styles.visitors}>
                        <span>{t('eventPage.eventDetails.visitors')}</span>
                        <div className={styles.avatars}>
                            {[...new Set(dataTickets?.tickets.map(el => JSON.stringify(el)))].map((el, index) => {
                                el = JSON.parse(el);
                                if (index < 18 && el.can_show) {
                                    return <Link to={`/user/${el.user.id}`} key={index}>
                                        <Avatar
                                            variant="circular"
                                            src={el.user.image}
                                            alt={el.user.first_name + el.user.last_name}
                                            className={styles.avatar}
                                            sizes="40px"
                                        />
                                    </Link>
                                }
                            })}
                            {dataTickets.tickets.length > 1 && <div onClick={() => setModalUsersOpen(true)} className={styles.moreVisitors}>{t('eventPage.eventDetails.moreVisitors')}</div>}
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
                    <div>
                        <Button variant='contained' onClick={() => setModalOpen(true)} className={styles.buy_btn}>{t('eventPage.eventDetails.buy')}</Button>
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
                            <img src={isLikeActive ? "/assets/heart_filled_icon.png" : "/assets/heart_empty_icon.png"} alt={t('eventPage.eventDetails.like')} />
                        </motion.div>
                    </div>
                    <span>{ticket_amount} {t('eventPage.eventDetails.ticketsLeft')}</span>
                </div>
            </div>
        </div>
    )
};

export default EventInfo;