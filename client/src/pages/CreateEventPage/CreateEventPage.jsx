import Layout from '../../components/Layout/Layout';
import EventInfoCreate from '../../components/EventInfoCreate/EventInfoCreate';

import styles from './CreateEventPage.module.scss';

const CreateEventPage = () => {
    return (
        <Layout>
            <div className={styles.header}>
                <div
                    className={styles.image}
                    style={{
                        backgroundImage:
                        "url(https://images.squarespace-dcdn.com/content/v1/5c213a383c3a53bf091b1c36/3f825ca8-72ac-4c5d-b485-035b9ddb5364/h.jpeg)",
                    }}
                >
                    <span>No Image</span>
                </div>
                <EventInfoCreate />
            </div>
        </Layout>
    )
};

export default CreateEventPage;