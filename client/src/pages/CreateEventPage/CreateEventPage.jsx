import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Layout from '../../components/Layout/Layout';
import EventInfoCreate from '../../components/EventInfoCreate/EventInfoCreate';
import RichEditor from '../../components/RichEditor/RichEditor';
import Map from '../../components/Map/Map';
import SpotifySearch from '../../components/SpotifySearch/SpotifySearch';
import { selectIsAuth } from '../../redux/slices/authSlice';
import { useUploadPosterMutation, useCreateEventMutation } from '../../redux/api/fetchEventsApi';

import styles from './CreateEventPage.module.scss';

const CreateEventPage = () => {
    const auth = useSelector(selectIsAuth);
    const navigate = useNavigate();
    console.log(auth);

    const { userInfo } = useSelector((state) => state.auth);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadPoster, { isLoading: isUpdating}] = useUploadPosterMutation();
    const [createEvent, {isLoading: isCreating}] = useCreateEventMutation();

    console.log(selectedImage);

    const { register, handleSubmit, formState, control, setValue } = useForm({
        mode: 'onChange'
    });

    useEffect(() => {
        if (selectedImage) {
          setImageUrl(URL.createObjectURL(selectedImage));
          console.log(imageUrl);
        }
    }, [selectedImage]);

    useEffect(() => {
        if(!auth) {
            navigate('/login');
        }
    }, [])

    // const handleImageUpload = (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     const file = e.target.files[0];
    //     formData.append('poster', file);
    //     console.log(formData);
    //     uploadPoster({file});
    // }

    const getFullTime = (date, time) => {
        const dateNew = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const timeNew = `${time.getHours()}:${time.getMinutes()}`;
        return `${dateNew} ${timeNew}:00+00`
    }

    const onSubmit = async (values) => {
        console.log("values:", values);
        const date = getFullTime(values.event_date, values.event_time);
        const publish_date = getFullTime(values.publish_date, values.publish_time)
        //console.log(date, publish_date);

        let event = Object.assign({}, {
            "title": values.title,
            "description": values.description,
            "price": values.price,
            "iso_currency": values.currency,
            "address": values.address,
            "location": values.location,
            "date": date,
            "publish_date": publish_date,
            "organizer_id": "1", // TODO set users organizer_id
            "ticket_amount": values.ticket_amount,
            "visibility": "public"}, // TODO
            values.spotify_id ? {"spotify_id" : values.spotify_id} : {}
        )
        console.log({event});
        let res = await createEvent(event).unwrap();
        
        const formData = new FormData();
        formData.append('poster', values.image[0]);
        await uploadPoster({file: formData, id: res.event.id});
    }

    useEffect(() => {
        if(!auth) {
            navigate('/login');
        }
    }, []);

    return (
        <Layout>
            <form className={styles.header} onSubmit={handleSubmit(onSubmit)}>
                <div
                    className={styles.image}
                    style={{
                        backgroundImage:
                        `url(${imageUrl})`,
                    }}
                >
                    <span>No Image</span>
                    <label htmlFor="img">
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                            <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z"></path>
                        </svg>
                    </label>
                    <input
                        type="file"
                        id='img'
                        accept="image/png, image/jpg, image/jpeg"
                        {...register('image', {onChange: (e) => {
                            setImageUrl(URL.createObjectURL(e.target.files[0]));
                        }})}
                    />
                </div>
                <div className={styles.info}>
                    <EventInfoCreate register={register} control={control}/>
                </div>
                <div className={styles.content}>
                    <RichEditor name="description" control={control} defaultValue="" formState={formState}/>
                    <Map register={register} setValue={setValue}/>
                    <SpotifySearch register={register} setValue={setValue}/>
                </div>
            </form>
        </Layout>
    )
};

export default CreateEventPage;