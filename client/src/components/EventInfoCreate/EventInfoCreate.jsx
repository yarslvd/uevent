import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { TimePicker  } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, MenuItem, Button, FormControl } from '@mui/material';
import { Controller } from 'react-hook-form';
import { isFuture, setDate } from "date-fns";
import { currencies, priceRegExp } from '../../data/variables';

import styles from './EventInfoCreate.module.scss';
import { useEffect } from 'react';

const EventInfoCreate = ({ register, control, eventInfo }) => {
    const [price, setPrice] = useState();
    const [currency, setCurrency] = useState('UAH');
    const [combinedPrice, setCombinedPrice] = useState('');
    const [valid, setValid] = useState(true);
    const [title, setTitle] = useState('');
    const [eventDate, setEventDate] = useState();
    const [eventTime, setEventTime] = useState();
    const [publishDate, setPublishDate] = useState();
    const [publishTime, setPublishTime] = useState();

    const handlePriceChange = (e) => {
        if(!priceRegExp.test(e.target.value)) {
            setValid(false);
        }
        else {
            valid === false && setValid(true);
            setPrice(e.target.value);
            setCombinedPrice(`${e.target.value} ${currency}`);
        }
    };

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
        setCombinedPrice(`${price} ${e.target.value}`);
    };
    useEffect(()=>{
        console.log("eventInfo");
        if (eventInfo) {
            setTitle(eventInfo.title);
            setPrice(eventInfo.price);
            setCurrency(eventInfo.iso_currency);
            setCombinedPrice(`${price} ${currency}`);
            setEventDate((new Date(eventInfo.date)));
            setEventTime((new Date(eventInfo.date)));
            // console.log("date init", new Date(eventInfo.date))
        }
    }, [eventInfo])

    return (
        <div className={styles.container}>
            <div className={styles.inputs}>
                <div>
                    <input type="text" value={title}  className={styles.title} placeholder='НАЗВА ПОДІЇ' {...register('title', { onChange: (e)=>{setTitle(e.target.value);},required: true, minLength: 5 })}/>
                </div>
                <div className={styles.money}>
                    <TextField
                        InputLabelProps={{shrink: price ? true : false}}
                        id="price"
                        label="Price"
                        variant="outlined"
                        className={styles.price}
                        onChange={handlePriceChange}
                        error={!valid}
                        type='number'
                        inputProps={{ min: 0, max: 10000 }}
                        value={price}
                        {...register('price', {onChange: (e)=>{setPrice(e.target.value)}})}
                    />
                    <TextField
                        id="select-currency"
                        select
                        label="Currency"
                        defaultValue={"UAH"}
                        value={currency}
                        className={styles.currency}
                        {...register('currency', { onChange: handleCurrencyChange, required: true })}
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Controller
                            control={control}
                            name="event_date"
                            rules={{
                                validate: {
                                    min: (date) => isFuture(date) || "Please, enter a future date"
                                },
                                required: true
                            }}
                            render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                                <DatePicker
                                    {...field}
                                    inputRef={ref}
                                    required={true}
                                    label="Event Date"
                                    textField={(inputProps) => (
                                        <TextField
                                            {...inputProps}
                                            onBlur={onBlur}
                                            name={name}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                            
                                        />
                                    )}
                                    defaultValue={eventDate}
                                    value={eventDate}
                                    onChange={(e)=>{setEventDate(e); console.log("date", e)}}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="event_time"
                            rules={{
                                required: true
                            }}
                            render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                                <TimePicker
                                    {...field}
                                    inputRef={ref}
                                    label="Event Time"
                                    ampm={false}
                                    textField={(inputProps) => (
                                        <TextField
                                            {...inputProps}
                                            onBlur={onBlur}
                                            name={name}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                    value={eventTime}
                                    defaultValue={eventTime}
                                    onChange={(e)=>setEventTime(e)}
                                />
                            )}
                        />
                        {/* <DatePicker
                            name='date'
                            label="Select Date"
                            renderInput={(params) =>
                            <TextField
                                {...params}
                                {...register("date")}
                            />}
                        /> */}
                    </LocalizationProvider>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Controller
                            control={control}
                            name="publish_date"
                            rules={{
                                validate: {
                                    min: (date) => isFuture(date) || "Please, enter a future date"
                                },
                                required: true
                            }}
                            render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                                <DatePicker
                                    {...field}
                                    inputRef={ref}
                                    required={true}
                                    label="Publish Date"
                                    textField={(inputProps) => (
                                        <TextField
                                            {...inputProps}
                                            onBlur={onBlur}
                                            name={name}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                    value={publishDate}
                                    onChange={(e)=>setPublishDate(e)}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="publish_time"
                            rules={{
                                required: true
                            }}
                            render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                                <TimePicker
                                    {...field}
                                    inputRef={ref}
                                    label="Publish Time"
                                    ampm={false}
                                    textField={(inputProps) => (
                                        <TextField
                                            {...inputProps}
                                            onBlur={onBlur}
                                            name={name}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                    value={publishTime}
                                    onChange={(e)=>setPublishTime(e)}
                                />
                            )}
                        />
                        {/* <DatePicker
                            name='date'
                            label="Select Date"
                            renderInput={(params) =>
                            <TextField
                                {...params}
                                {...register("date")}
                            />}
                        /> */}
                    </LocalizationProvider>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <TextField
                        id="location"
                        label="Place name"
                        variant="outlined"
                        className={styles.price}
                        onChange={handlePriceChange}
                        error={!valid}
                        type='text'
                        style={{ width: '100%'}}
                        {...register('location', {required: true})}
                    />
                    <TextField
                        id="tickets"
                        label="Tickets Amount"
                        variant="outlined"
                        className={styles.price}
                        onChange={handlePriceChange}
                        error={!valid}
                        type='number'
                        {...register('ticket_amount', {required: true})}
                    />
                </div>
            </div>
            <div className={styles.buttons}>
                <Button variant='outlined' className={styles.saveDraftsBtn} type="submit">Save to Drafts</Button>
                <Button variant='contained' className={styles.publishBtn} type="submit">Publish</Button>
            </div>
        </div>
    ) 
};

export default EventInfoCreate;