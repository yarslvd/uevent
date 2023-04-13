import { useState, useEffect } from 'react'
import { Modal, Button, Alert, FormControlLabel, Checkbox } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useValidatePromoMutation } from '../../redux/api/fetchPromoApi';
import { useGetEventInfoQuery } from '../../redux/api/fetchEventsApi';

import styles from './BuyTicketModal.module.scss';

const BuyTicketModal = ({ open, handleClose, price, iso_currency }) => {
    const { id } = useParams();

    const [promocode, setPromocode] = useState('');
    const [total, setTotal] = useState(0);
    const [itemCount, setItemCount] = useState(1);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showVisitor, setShowVisitor] = useState(true);

    const [validatePromocode] = useValidatePromoMutation();

    useEffect(() => {
        setTotal(+price);
    }, [price])

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          name: "",
          email: "",
          description: "",
        },
        mode: "onSubmit",
    });

    const validatePromo = async () => {
        try {
            const promo = await validatePromocode({event_id: +id, promo_text: promocode});
            console.log(promo.data.promo.discount);
            setTotal(total * (1 - (+promo.data.promo.discount / 100)));
            setSuccess('Promo was successfully applied!');
        }
        catch(err) {
            console.log(err);
            setTotal(null);
            setSuccess('');
            setError('error');
        }
    }

    const handleIncrease = () => {
        if(itemCount < 10) {
            setItemCount((current) => current + 1);
            setTotal((previous) => previous + +price);
        }
    }

    const handleDecrease = () => {
        if(itemCount > 1) {
            setItemCount((current) => current - 1);
            setTotal((previous) => previous - +price);
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Buy modal menu"
            aria-describedby="Choose number of tickets and apply promo"
        >
            <div className={styles.container}>
                <h1>Order summary</h1>
                <div style={{ height: '49px', margin: '10px 0' }}>
                    {success && <Alert severity="success">{success}</Alert>}
                    {error && <Alert severity="error">Promocode is invalid</Alert>}
                </div>
                <div className={styles.promocode}>
                    <h3>Promo code</h3>
                    <div className={styles.validate}>
                        <input
                            type="text"
                            id="promocode"
                            placeholder='Enter promocode'
                            className={styles.inputPromo}
                            onChange={(e) => {setPromocode(e.target.value); setSuccess(''); setError('');}}
                        />
                        <Button variant='contained' className={styles.applyButton} onClick={validatePromo}>Apply</Button>
                    </div>
                </div>
                <div style={{ height: '50px'}}>
                    {success &&
                        <div style={{ backgroundColor: '#e9e9e9', display: 'inline-block', padding: '5px 15px',
                                    borderRadius: '30px', marginTop: '10px' }}>
                            <span><b>{promocode}</b></span> applied
                        </div>
                    }
                </div>
                <FormControlLabel control={<Checkbox checked={showVisitor} />} label="Show as a visitor" onChange={(e) => setShowVisitor(e.target.checked)}/>
                <div className={styles.countContainer}>
                    <Button className={styles.countBtn} onClick={handleDecrease}>-</Button>
                    <span>{itemCount}</span>
                    <Button className={styles.countBtn} onClick={handleIncrease}>+</Button>
                </div> 
                <div className={styles.bottom}>
                    <Button variant='contained' className={styles.checkoutBtn}>Checkout</Button>
                    <span className={styles.price}>{total ? total : price} {iso_currency}</span>
                </div> 
            </div>
        </Modal>
    )
}

export default BuyTicketModal;