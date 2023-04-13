import React from 'react'
import { Link, useParams } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';
import { useGetOrganizationQuery } from '../../redux/api/fetchOrganizersApi';

import styles from './OrganizationPage.module.scss';

const OrganizationPage = () => {
    const { id } = useParams();

    const { isLoading, isError, data } = useGetOrganizationQuery(id);
    console.log(data);

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.image} style={{backgroundImage: `url(${'https://media.architecturaldigest.com/photos/623e05e0b06d6c32457e4358/master/pass/FINAL%20%20PFHH-notextwlogo.jpg'})`}}></div>
                    <div className={styles.info}>
                        <h3>{!isLoading && !isError && data.organizer.name}</h3>
                        <div className={styles.description}>
                            <span>{!isLoading && !isError && data.organizer.description}</span>
                        </div>
                        <div  className={styles.time}>
                            <a href={`mailto:${data.organizer.email}`}>{!isLoading && !isError && data.organizer.email}</a>
                        </div>
                    </div>
                    <Link to={`/event/${'wd'}`}>Follow</Link>
                </div>
            </div>                
        </Layout>
    )
}

export default OrganizationPage