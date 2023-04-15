import { useState, useEffect } from 'react'
import { Modal, Button, Alert, FormControlLabel, Checkbox } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useValidatePromoMutation } from '../../redux/api/fetchPromoApi';
import { useGetEventInfoQuery } from '../../redux/api/fetchEventsApi';

import styles from './BuyTicketModal.module.scss';
import { useLazyBuyTicketsQuery, useLazyBuyTicketsUnauthQuery } from '../../redux/api/fetchTicketsApi';
import { useSelector } from 'react-redux';
import {useTranslation} from "react-i18next";

const BuyTicketModal = ({ open, handleClose, price, iso_currency }) => {
    const { id } = useParams();
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [promocode, setPromocode] = useState('');
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [itemCount, setItemCount] = useState(1);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showVisitor, setShowVisitor] = useState(true);

    const [validatePromocode] = useValidatePromoMutation();
    const [buyTickets] = useLazyBuyTicketsQuery();
    const [buyTicketsUnauth] = useLazyBuyTicketsUnauthQuery();

    const { userInfo } = useSelector((state) => state.auth);

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
            setDiscount((+promo.data.promo.discount / 100));
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
            setTotal((previous) => previous + +price *(1 - discount));
        }
    }

    const handleDecrease = () => {
        if(itemCount > 1) {
            setItemCount((current) => current - 1);
            setTotal((previous) => previous - +price *(1 - discount));
        }
    }

    const handlePayment = async (e) => {
        e.preventDefault();
        let payment;
        if (userInfo) {
            const ticket = {
                event_id: +id,
                count: itemCount,
                promo: success ? promocode : '',
                can_show: showVisitor,
                redirect_url: window.location.href + '?check-payment=true'
            }
            payment = await buyTickets(ticket).unwrap();
        }
        else {
            const ticket = {
                event_id: +id,
                count: itemCount,
                promo: success ? promocode : '',
                email: email,
                redirect_url: window.location.href + '?check-payment=true'
            }
            payment = await buyTicketsUnauth(ticket).unwrap();
        }
 
        e.target[1].value = payment.data;
        e.target[2].value = payment.signature;
        e.target.submit();
        
        return true;
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Buy modal menu"
            aria-describedby="Choose number of tickets and apply promo"
        >
            <div className={styles.container}>
                <h1>t('buyTicketModal.title')</h1>
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
                {userInfo ?
                    <FormControlLabel 
                        control={
                            <Checkbox checked={showVisitor}
                                sx={{
                                    color: "#000",
                                    '&.Mui-checked': {
                                    color: "#000",
                                    },
                                }}
                            />
                        }
                        label="Show as a visitor"
                        onChange={(e) => setShowVisitor(e.target.checked)}
                    />
                    :
                    <div className={styles.promocode}>
                        <h3>Email</h3>
                        <div className={styles.validate} style={{height: "48px"}}>
                            <input
                                type="email"
                                id="email"
                                placeholder='Enter email'
                                className={styles.inputPromo}
                                onChange={(e) => {setEmail(e.target.value);}}
                            />
                        </div>
                    </div>
                }
                
                <div className={styles.countContainer}>
                    <Button className={styles.countBtn} onClick={handleDecrease}>-</Button>
                    <span>{itemCount}</span>
                    <Button className={styles.countBtn} onClick={handleIncrease}>+</Button>
                </div> 
                <form method="POST" action="https://www.liqpay.ua/api/3/checkout" onSubmit={handlePayment} acceptCharset="utf-8">
                    <div className={styles.bottom}>
                        <Button variant='contained' className={styles.checkoutBtn} type="submit">Checkout</Button>
                        <span className={styles.price}>{total ? Number(total)?.toFixed(2) : Number(price)?.toFixed(2)} {iso_currency}</span>
                        <input type="hidden" name="data" value=""/>
                        <input type="hidden" name="signature" value=""/>
                    </div>
                </form> 
            </div>
        </Modal>
    )
}

export default BuyTicketModal;