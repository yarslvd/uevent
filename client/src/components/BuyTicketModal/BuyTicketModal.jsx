import { useState } from 'react'
import { Modal, Button } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useValidatePromoMutation } from '../../redux/api/fetchPromoApi';

import styles from './BuyTicketModal.module.scss';

const BuyTicketModal = ({ open, handleClose }) => {
    const [promocode, setPromocode] = useState('');

    const [validatePromocode] = useValidatePromoMutation();

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

    const validatePromo = () => {
        console.log(promocode);
        const response = validatePromocode().unwrap();
        console.log(response);
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
                <div className={styles.promocode}>
                    <h3>Promo code</h3>
                    <form>
                        <input
                            type="text"
                            id="promocode"
                            placeholder='Enter promocode'
                            className={styles.inputPromo}
                            onChange={(e) => setPromocode(e.target.value)}
                        />
                        <Button variant='contained' className={styles.applyButton} onClick={validatePromo}>Apply</Button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default BuyTicketModal;