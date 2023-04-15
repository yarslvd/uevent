import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

import Layout from '../../components/Layout/Layout';
import { useGetPublicUserQuery } from '../../redux/api/fetchAuthApi';

import styles from './PublicProfile.module.scss';

const PublicProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetPublicUserQuery(+id);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if(data?.user.id === userInfo.id) {
            navigate('/profile');
        }
    }, [data, userInfo])

    return !isLoading && !isError ? (
        <Layout>
            <div className={styles.container}>
                <Avatar src={data.user.image} alt={data.user.first_name} className={styles.avatar}></Avatar>
                <div className={styles.displayContainer}>
                    <div className={styles.text}>
                        <h3>{`${data.user.first_name} ${data.user.last_name}`}</h3>
                        <span>@{data.user.username}</span>
                        <a href={`mailto:${data.user.email}`} className={styles.email}>{data.user.email}</a>
                    </div>
                </div>
            </div>
        </Layout>
    ) : <></>
}

export default PublicProfile