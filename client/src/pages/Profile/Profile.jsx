import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Tabs, Tab, Avatar, Button, useMediaQuery } from '@mui/material';

import Layout from '../../components/Layout/Layout';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { selectIsAuthMe } from '../../redux/slices/authSlice';
import { useGetFavouritesQuery } from '../../redux/api/fetchFavouritesApi';
import { useDeleteFavouriteMutation } from '../../redux/api/fetchFavouritesApi';
import { useGetTicketsQuery } from '../../redux/api/fetchTicketsApi';

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

const favouritesEvents = [
    { title: 'Harry Styles', image_url: 'https://media.architecturaldigest.com/photos/623e05e0b06d6c32457e4358/master/pass/FINAL%20%20PFHH-notextwlogo.jpg' },
    { title: 'The Weeknd', image_url: 'https://www.livenationentertainment.com/wp-content/uploads/2022/03/TR_NationalAsset_TheWeeknd_SG_1200x628.jpg' },
    { title: 'Океан Ельзи. Світовий тур 2023', image_url: 'https://vgorode.ua/img/article/11918/24_main-v1640936452.jpg' },
    { title: 'Океан Ельзи. Світовий тур 2023', image_url: 'https://vgorode.ua/img/article/11918/24_main-v1640936452.jpg' },
];

const Profile = () => {
    const navigate = useNavigate();
    const auth = useSelector(selectIsAuthMe);
    const matches = useMediaQuery('(max-width:930px)');
    const { userInfo } = useSelector((state) => state.auth);
    console.log(userInfo.id);

    const [value, setValue] = useState(0);
    const [isLikeActive, setIsLikeActive] = useState(true);

    const { data: dataFavourites, isLoading: isLoadingFavourites, isError: isErrorFavourites, refetch: refetchFavourites } = useGetFavouritesQuery();
    const { data: dataTickets, isLoading: isLoadingTickets, isError: isErrorTickets } = useGetTicketsQuery({ user_id: +userInfo.id });
    const [deleteFavourite] = useDeleteFavouriteMutation();

    console.log(dataTickets);

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

    useEffect(() => {
        if(!auth) {
            navigate('/login');
        }
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
                                                <Link to='/'>{el.event.title}</Link>
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
                                    {favouritesEvents.map((el, index) => (
                                        <div className={styles.item} key={index}>
                                            <div className={styles.info}>
                                                <Avatar className={styles.avatar} src={el.image_url}></Avatar>
                                                <Link to='/'>{el.title}</Link>
                                            </div>
                                            <div className={styles.like}>
                                                <Button variant='contained'>Unfollow</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </Box>
            </div>
        </Layout>
    )
}

export default Profile