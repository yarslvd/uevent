

import Layout from '../../components/Layout/Layout';
import EventInfo from '../../components/EventInfo/EventInfo';

import styles from './EventPage.module.scss';

const EventPage = () => {
    return (
        <Layout>
            <div className={styles.header}>
                <div className={styles.image} style={{ backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/5c213a383c3a53bf091b1c36/3f825ca8-72ac-4c5d-b485-035b9ddb5364/h.jpeg)' }}></div>
                <EventInfo />
            </div>
        </Layout>
    )
};

export default EventPage;