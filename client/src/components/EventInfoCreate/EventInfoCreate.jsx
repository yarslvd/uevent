import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker  } from '@mui/x-date-pickers/MobileTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, MenuItem, Button } from '@mui/material';

import { currencies, priceRegExp } from '../../data/variables';

import styles from './EventInfoCreate.module.scss';

const EventInfoCreate = () => {
    const [price, setPrice] = useState();
    const [currency, setCurrency] = useState('UAH');
    const [combinedPrice, setCombinedPrice] = useState('');
    const [valid, setValid] = useState(true);

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

    return (
        <div className={styles.container}>
            <div className={styles.inputs}>
                <div>
                    <input type="text" className={styles.title} placeholder='НАЗВА ПОДІЇ' required={true} />
                </div>
                <div className={styles.money}>
                    <TextField
                        id="price"
                        label="Price"
                        variant="outlined"
                        className={styles.price}
                        onChange={handlePriceChange}
                        error={!valid}
                        required={true}
                        type='number'
                    />
                    <TextField
                        id="select-currency"
                        select
                        label="Currency"
                        defaultValue="UAH"
                        className={styles.currency}
                        onChange={handleCurrencyChange}
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker  label="Select Time" required={true} ampm={false} onChange={(e) => console.log(e.$H + ':' + e.$m)}/>
                    <DatePicker label="Select Date" onChange={(e) => console.log(Date.parse(e.$d))}/>
                </LocalizationProvider>
            </div>
            <div className={styles.buttons}>
                <Button variant='outlined' className={styles.saveDraftsBtn}>Save to Drafts</Button>
                <Button variant='contained' className={styles.publishBtn}>Publish</Button>
            </div>
        </div>
    ) 
};

export default EventInfoCreate;