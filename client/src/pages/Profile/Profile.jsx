import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Tabs, Tab, Avatar, Button, useMediaQuery } from '@mui/material';

import Layout from '../../components/Layout/Layout';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import OrganizationModal from '../../components/OrganizationCreateModal/OrganizationModal';
import { selectIsAuthMe } from '../../redux/slices/authSlice';
import { useGetFavouritesQuery } from '../../redux/api/fetchFavouritesApi';
import {
    useDeleteSubscriptionMutation,
    useGetProfileSubscriptionsQuery
} from "../../redux/api/fetchSubscriptionsApi";
import { useDeleteFavouriteMutation } from '../../redux/api/fetchFavouritesApi';
import { useGetTicketsQuery } from '../../redux/api/fetchTicketsApi';
import { useGetEventsQuery } from '../../redux/api/fetchEventsApi';
import { dateOptions, timeOptions } from '../../data/variables';

import styles from './Profile.module.scss';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>{children}</Box>
        )}
      </div>
    );
}

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}


const Profile = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const auth = useSelector(selectIsAuthMe);
    const matches = useMediaQuery('(max-width:930px)');
    const { userInfo } = useSelector((state) => state.auth);
    console.log(userInfo);

    const [value, setValue] = useState(0);
    const [isLikeActive, setIsLikeActive] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [initialIndex, setInitialIndex] = useState(0);

    const { data: dataFavourites, isLoading: isLoadingFavourites, isError: isErrorFavourites, refetch: refetchFavourites } = useGetFavouritesQuery();
    const { data: dataSubscriptions, isLoading: isLoadingSubscriptions, isError: isErrorSubscriptions, refetch: refetchSubscriptions } = useGetProfileSubscriptionsQuery(userInfo?.id, 1000, 0);
    const { data: dataTickets, isLoading: isLoadingTickets, isError: isErrorTickets, refetch: refetchTickets } = useGetTicketsQuery(auth && { user_id: +userInfo?.id });
    const { data: dataEvents, isLoading: isLoadingEvents, isError: isErrorEvents, refetch: refetchEvents } = useGetEventsQuery({ limit: 1000, id: userInfo?.organizers && userInfo.organizers[0]?.id });

    const [deleteFavourite] = useDeleteFavouriteMutation();
    const [deleteSubscription] = useDeleteSubscriptionMutation();

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const deleteLike = (id) => {
        deleteFavourite(+id)
            .unwrap()
            .then(() => {
                refetchFavourites();
            })
            .catch(err => console.log(err))
    }

    const deleteSubs = (organizer_id) => {
        deleteSubscription(organizer_id)
            .unwrap()
            .then(() => {
                refetchSubscriptions(userInfo.id, 1000, 0);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if(!auth) {
            navigate('/login');
            return;
        }
        let selectedTab = searchParams.get("tab");
        if (selectedTab) {
            if (!isNaN(selectedTab)) {
                setValue(+selectedTab);
            }
            window.history.replaceState({}, 'uevent', window.location.href.split("?")[0]);
        }

        refetchFavourites();
        refetchSubscriptions();
        refetchTickets();
        refetchEvents();
    }, []);

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.card}>
                    <ProfileCard {...userInfo}/>
                </div>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            TabIndicatorProps={{ sx: { backgroundColor: '#1f1f1f' } }}
                            sx={{
                                '& .Mui-selected': { color: '#1f1f1f !important' },
                            }}
                            centered={matches}
                            initialSelectedIndex={initialIndex}
                        >
                            <Tab label="Home" {...a11yProps(0)} />
                            <Tab label="My tickets" {...a11yProps(1)} />
                            <Tab label="Company" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <div className={styles.homeContainer}>
                            <div className={styles.colContainer}>
                                <h3>Favourites</h3>
                                <div className={styles.itemsContainer}>
                                    {!isLoadingFavourites && !isErrorFavourites && dataFavourites.favourites.rows.map((el, index) => (
                                        <div className={styles.item} key={index}>
                                            <div className={styles.info}>
                                                <Avatar className={styles.avatar} src={el.event.poster}></Avatar>
                                                <Link to={`/event/${el.event_id}`}>{el.event.title}</Link>
                                            </div>
                                            <div className={styles.like}>
                                                <motion.div 
                                                    className={styles.like_btn}
                                                    whileTap={{ scale: 0.8 }}
                                                    onClick={() => deleteLike(el.event.id)}
                                                >
                                                    <img src={isLikeActive ? "/assets/heart_filled_icon.png" : "/assets/heart_empty_icon.png"} alt="Like Event" />
                                                </motion.div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.colContainer}>
                                <h3>Subscriptions</h3>
                                <div className={styles.itemsContainer}>
                                    {!isLoadingSubscriptions && !isErrorSubscriptions && dataSubscriptions.subscriptions.rows.map((el, index) => (
                                        <div className={styles.item} key={index}>
                                            <div className={styles.info}>
                                                <Avatar className={styles.avatar} src={el.organizer.image}></Avatar>
                                                <Link to={`/organization/${el.organizer.id}`}>{el.organizer.name}</Link>
                                            </div>
                                            <div className={styles.like}>
                                                <Button variant='contained' onClick={() => deleteSubs(el.organizer.id)}>Unfollow</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className={styles.ticketsContainer}>
                            {!isLoadingTickets && !isErrorTickets && dataTickets.tickets.count !== 0 ? [...new Set(dataTickets.tickets.map(el => {
                                const {id, payment_id, can_show, ...rest} = el;  
                                const {ticket_amount, ...restEvent} = el.event;
                                rest.event = restEvent;
                                
                                return JSON.stringify(rest)
                            }))].map((el, index) => {
                            el = JSON.parse(el);
                            // console.log(el.event_id, ":", eventTicketsCounts[el.event_id]);
                            return (
                                <div className={styles.ticket} key={index}>
                                    <div className={styles.image} style={{backgroundImage: `url(${el.event.poster})`}}></div>
                                    <div className={styles.info}>
                                        <div className={styles.left}>
                                            <div className={styles.details}>
                                                <h3>{el.event.title}</h3>
                                                <div className={styles.location}>
                                                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LocationOnIcon">
                                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                                                    </svg>
                                                    <span>{el.event.address}</span>
                                                </div>
                                                <div className={styles.time}>
                                                    <img src="/assets/clock_icon.png" alt="Time" />
                                                    <span>{(new Date(el.event.date)).toLocaleString('uk-UK', dateOptions).toUpperCase().slice(0, -3)}</span>
                                                </div>
                                            </div>
                                            <Link to={`/event/${el.event_id}`}>More</Link>
                                        </div>
                                        <div className={styles.right}>
                                            <motion.div 
                                                className={styles.downloadBtn}
                                                whileTap={{ scale: 0.8 }}
                                                // onClick={handleLike}
                                            >
                                                <a href={`${process.env.REACT_APP_BASE_URL}/api/tickets/pdf?event_id=${el.event_id}`} download target='_blank' rel="noreferrer"><img src={'/assets/download.png'} alt="Download Ticket"/></a>
                                            </motion.div>
                                            <span>Amount: {el.count}</span>
                                        </div>
                                    </div>
                                </div>
                            )}) :
                                <span className={styles.noTickets}>You have no tickets ;(</span>
                            }
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div className={styles.companyContainer}>
                            {userInfo?.organizers?.length >= 1 ? 
                                <div className={styles.company}>
                                    <div className={styles.card}>
                                        <div className={styles.avatarContainer}>
                                            <Avatar src={userInfo.organizers[0].image} className={styles.avatar}></Avatar>
                                            <Button variant='contained' onClick={() => setModalOpen(true)} className={styles.editBtn}>Edit</Button>
                                            <OrganizationModal
                                                open={modalOpen}
                                                handleClose={handleClose}
                                                organizer={userInfo.organizers[0]}
                                            />
                                        </div>
                                        <div className={styles.info}>
                                            <Link to={`/organization/${userInfo.organizers[0].id}`} className={styles.orgName}><h3>{userInfo.organizers[0].name}</h3></Link>
                                            <p>{userInfo.organizers[0].description}</p>
                                            <div className={styles.email}>
                                                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EmailIcon">
                                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"></path>
                                                </svg>
                                                <a href={`mailto:${userInfo.organizers[0].email}`}>{userInfo.organizers[0].email}</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.eventsContainer}>
                                        <div className={styles.bar}>
                                            <h3>Your Events</h3>
                                            <Button variant='outlined'>
                                                <Link to={'/event/new'}>New Event</Link>
                                            </Button>
                                        </div>
                                        <div className={styles.events}>
                                            {!isLoadingEvents && !isErrorEvents && dataEvents.events.rows.map((el, index) => (
                                                <div className={styles.eventContainer} key={index}>
                                                    <div className={styles.image} style={{backgroundImage: `url(${el.poster})`}}></div>
                                                    <div className={styles.info}>
                                                        <div className={styles.left}>
                                                            <div className={styles.details}>
                                                                <h3>{el.title}</h3>
                                                                <div className={styles.location}>
                                                                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LocationOnIcon">
                                                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                                                                    </svg>
                                                                    <span>{el.location}</span>
                                                                </div>
                                                                <div className={styles.time}>
                                                                    <img src="/assets/clock_icon.png" alt="Time" />
                                                                    <span>{el.date}</span>
                                                                </div>
                                                            </div>
                                                            <Link to={`/event/${el.id}/edit`}>Edit</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div> :
                                <div className={styles.noCompany}>
                                    <Button variant='contained' onClick={() => setModalOpen(true)} className={styles.newBtn}>Create new organization</Button>
                                    <OrganizationModal
                                        open={modalOpen}
                                        handleClose={handleClose}
                                    />
                                </div>
                            }
                        </div>
                    </TabPanel>
                </Box>
            </div>
        </Layout>
    )
}

export default Profile



