import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Button, useMediaQuery, Pagination } from '@mui/material';
import { useSelector } from 'react-redux';

import Layout from '../../components/Layout/Layout';
import Card from '../../components/Card/Card';
import WideCard from '../../components/WideCard/WideCard';
import { useGetOrganizationQuery } from '../../redux/api/fetchOrganizersApi';
import { useGetSubscriptionOneQuery, useAddSubscriptionMutation, useDeleteSubscriptionMutation } from '../../redux/api/fetchSubscriptionsApi';
import { useGetEventsQuery } from '../../redux/api/fetchEventsApi';

import styles from './OrganizationPage.module.scss';

const OrganizationPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const matches = useMediaQuery('(max-width:800px)');

    const [page, setPage] = useState(1);

    const { userInfo } = useSelector((state) => state.auth);
    const { data: dataSubscriptions, isLoading: isLoadingSubscriptions, isError: isErrorSubscriptions, refetch } = useGetSubscriptionOneQuery({ organizer_id: id, user_id: userInfo.id });
    const { data: dataEvents, isLoading: isLoadingEvents, isError: isErrorEvents } = useGetEventsQuery({ limit: 4, id: +id, page: page });
    const { isLoading, isError, data } = useGetOrganizationQuery(id);

    const [addSubscription] = useAddSubscriptionMutation();
    const [deleteSubscription] = useDeleteSubscriptionMutation();

    const [follow, setFollow] = useState(false);
    
    const handleFollow = () => {
        setFollow(!follow);
        
        if(follow) {
            deleteSubscription(+id)
                .unwrap()
                .then(() => {
                    refetch();
                })
        }
        else {
            addSubscription({organizer_id: +id})
                .unwrap()
                .then(() => {
                    refetch();
                })
        }
    };

    const handlePageChange = (e, p) => {
        setPage(p - 1);
    
        const body = document.querySelector('#root');
        body.scrollIntoView({
          behavior: 'smooth'
        });
    }

    useEffect(() => {
        if (dataSubscriptions?.subscription) {
            setFollow(true);
        }
    }, [!isLoadingSubscriptions, dataSubscriptions != null]);

    if (!isLoading && !data.organizer) {
        navigate("/404")
    }
    console.log("Data:", data)
    return (
        <>
        {
        !isLoading && data.organizer &&
        <Layout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.image}
                         style={{backgroundImage: `url(${!isLoading && !isError && data.organizer.poster})`}}></div>
                    <div className={styles.info}>
                        <div className={styles.content}>
                            <h3>{!isLoading && !isError && data.organizer.name}</h3>
                            <div className={styles.description}>
                                <span>{!isLoading && !isError && data.organizer.description}</span>
                            </div>
                            <div className={styles.email}>
                                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EmailIcon">
                                    <path
                                        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"></path>
                                </svg>
                                <a href={`mailto:${!isLoading && !isError && data.organizer.email}`}>{!isLoading && !isError && data.organizer.email}</a>
                            </div>
                        </div>
                        <Button
                            variant='contained'
                            className={styles.followBtn}
                            onClick={handleFollow}
                        >
                            {follow ? 'Unfollow' : 'Follow'}
                        </Button>
                    </div>
                </div>
                <div className={styles.outerContainer}>
                    <div className={styles.title}>
                        <h2>Organization Events</h2>
                        <img src="/assets/popularEvents_illustration.svg" alt=""/>
                    </div>
                    <div className={styles.events_container}>
                        <div className={styles.events}>
                            {!isLoadingEvents && !isErrorEvents && dataEvents.events.rows.map((el, index) => (
                                matches ?
                                    <Card {...el} key={index}/> :
                                    <WideCard {...el} key={index}/>
                            ))}
                        </div>
                        {!isLoadingEvents && !isErrorEvents && dataEvents.events.pages > 1 &&
                            <Pagination count={dataEvents.events.pages} size={matches ? 'small' : 'large'}
                                        onChange={handlePageChange} className={styles.pagination}/>
                        }
                    </div>
                </div>
            </div>
        </Layout>
        }
        </>
    )
}

export default OrganizationPage