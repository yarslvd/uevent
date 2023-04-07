import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Chip, Stack, TextField, Button, Select, FormControl, MenuItem, InputLabel } from '@mui/material';

import Layout from '../../components/Layout/Layout';
import EventInfoCreate from '../../components/EventInfoCreate/EventInfoCreate';
import RichEditor from '../../components/RichEditor/RichEditor';
import Map from '../../components/Map/Map';
import SpotifySearch from '../../components/SpotifySearch/SpotifySearch';
import { selectIsAuth } from '../../redux/slices/authSlice';
import { useUploadPosterMutation, useCreateEventMutation } from '../../redux/api/fetchEventsApi';

import styles from './CreateEventPage.module.scss';

const themes = [
  'Business',
  'Psychology',
  'Politics',
  'Programming',
  'Sports',
  'Science'
];

const formats = [
  'Conferences',
  'Lectures',
  'Workshops',
  'Fests',
  'Parties',
  'Concerts'
];

const CreateEventPage = () => {
    const auth = useSelector(selectIsAuth);
    const navigate = useNavigate();

    //States
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [percentage, setPercentage] = useState(1);
    const [promocode, setPromocode] = useState("");
    const [promoLabel, setPromoLabel] = useState("");
    const [theme, setTheme] = useState('');
    const [format, setFormat] = useState('');
    const [promocodeList, setPromocodeList] = useState([]);

    //Mutations
    const [uploadPoster, { isLoading: isUpdating}] = useUploadPosterMutation();
    const [createEvent, {isLoading: isCreating}] = useCreateEventMutation();


    console.log(promocodeList);

    //Form
    const { register, handleSubmit, formState, control, setValue } = useForm({
        mode: 'onChange'
    });

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
        
        if (values.image[0]) {
            const formData = new FormData();
            formData.append('poster', values.image[0]);
            await uploadPoster({file: formData, id: res.event.id});
        }
    }

    const handleDeletePromo = (chipIdToDelete) => {
        setPromocodeList((prevChips) =>
            prevChips.filter((chip) => chip.promoLabel !== chipIdToDelete)
        );
    };

    const handleAddPromo = () => {
        //console.log(!promocodeList.includes({ promo: `${promocode} (-${percentage}%)`}));
        if(promocode !== '' && percentage > 0 && !promocodeList.includes({ promo: `${promocode} (-${percentage}%)`})) {
            const promoLabel = `${promocode} (-${percentage}%)`
            setPromocodeList(current => [...current, { promoLabel, percentage: +percentage, promocode }]);
            setPromocode('');
            setPercentage(0);
        }
    }

    useEffect(() => {
        if(!auth) {
            navigate('/login');
        }
    }, []);

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
                    <div className={styles.details}>
                        <h3>Деталі</h3>
                        <div className={styles.all_details}>
                            <div className={styles.content_details}>
                                <div className={styles.promoCreator}>
                                    <div className={styles.inputs}>
                                        <TextField
                                            id="promocode"
                                            label="Promocode"
                                            variant="standard"
                                            value={promocode}
                                            onChange={(e) => setPromocode(e.target.value)}
                                        />
                                        <TextField
                                            label="%"
                                            value={percentage}
                                            onChange={(e) => setPercentage(e.target.value)}
                                            type="number"
                                            variant="standard"
                                            inputProps={{
                                                min: 0,
                                                max: 100,
                                                step: 1,
                                            }}
                                        />
                                        <Button variant='contained' className={styles.add_btn} onClick={handleAddPromo}>Add</Button>
                                    </div>
                                </div>
                                <Stack direction="row" spacing={1} sx={{ maxWidth: '920px', overflowX: 'auto', padding: '10px' }}>
                                    {promocodeList.map((el, index) => (
                                        <Chip label={el.promoLabel} color="default" onDelete={() => handleDeletePromo(el.promoLabel)} key={index} />
                                    ))}
                                </Stack>
                            </div>
                            <FormControl sx={{width: '100%', maxWidth: '300px'}}>
                                <InputLabel id="Theme">Theme</InputLabel>
                                <Select
                                    labelId="Theme"
                                    id="Theme"
                                    value={theme}
                                    label="Theme"
                                    sx={{ marginRight: '20px' }}
                                    {...register('theme', { required: true })}
                                    onChange={(e) => setTheme(e.target.value)}
                                >
                                    {themes.map((el, index) => (
                                        <MenuItem value={el} key={index}>{el}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{width: '100%', maxWidth: '300px'}}>
                                <InputLabel id="Format">Format</InputLabel>
                                <Select
                                    labelId="Format"
                                    id="Format"
                                    value={format}
                                    label="Format"
                                    {...register('format', { required: true })}
                                    onChange={(e) => setFormat(e.target.value)}
                                >
                                    {formats.map((el, index) => (
                                        <MenuItem value={el} key={index}>{el}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <RichEditor name="description" control={control} defaultValue="" formState={formState}/>
                    <Map register={register} setValue={setValue}/>
                    <SpotifySearch register={register} setValue={setValue}/>
                </div>
            </form>
        </Layout>
    )
};

export default CreateEventPage;