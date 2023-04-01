

import Layout from '../../components/Layout/Layout';
import EventInfoCreate from '../../components/EventInfoCreate/EventInfoCreate';
import RichEditor from '../../components/RichEditor/RichEditor';
import Map from '../../components/Map/Map';
import SpotifySearch from '../../components/SpotifySearch/SpotifySearch';

import styles from './CreateEventPage.module.scss';

const CreateEventPage = () => {

    const handleImageUpload = (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        console.log(file);
    }

    return (
        <Layout>
            <div className={styles.header}>
                <div
                    className={styles.image}
                    style={{
                        backgroundImage:
                        "url(https://images.squarespace-scdn.com/content/v1/5c213a383c3a53bf091b1c36/3f825ca8-72ac-4c5d-b485-035b9ddb5364/h.jpeg)",
                    }}
                >
                    <span>No Image</span>
                    <label htmlFor="img">
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                            <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z"></path>
                        </svg>
                    </label>
                    <input type="file" id='img' accept="image/png, image/jpg, image/jpeg" onChange={handleImageUpload}/>
                </div>
                <div className={styles.info}>
                    <EventInfoCreate />
                </div>
                <div className={styles.content}>
                    <RichEditor />
                    <Map />
                    <SpotifySearch />
                </div>
            </div>
        </Layout>
    )
};

export default CreateEventPage;