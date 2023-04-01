import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Alert, Button } from "@mui/material";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

import styles from './ResetPassword.module.scss';

const ResetPassword = () => {
    const [sent, setSent] = useState(false);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        email: "",
      },
      mode: "onChange",
    });
  
    const onSubmit = async (values) => {
      console.log(values);
    //   dispatch(fetchResetPassword(values));
    //   setSent(true);
    };

    return (
        <main>
            <section className={styles.background}>
                <div className={styles.contentContainer}>
                    <Link to={'/'} className={styles.logo}>
                        <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M40 20.0385C40 31.1055 31.0457 40.0771 20 40.0771C8.9543 40.0771 0 31.1055 0 20.0385C0 14.9985 1.85709 10.3931 4.92308 6.87176C7.41833 4.00589 10.7143 1.85803 14.4615 0.778275C16.2203 0.271491 18.0785 0 20 0C21.4789 0 22.9203 0.160822 24.3077 0.465964C27.9618 1.26962 31.2416 3.07434 33.8462 5.57864C37.639 9.22544 40 14.3557 40 20.0385Z" fill="#1F1F1F"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.4615 0.778275V12.3622C14.4615 13.9448 14.8205 15.1676 15.5385 16.0308C16.2564 16.894 17.3128 17.3256 18.7077 17.3256C19.7538 17.3256 20.7282 17.1098 21.6308 16.6782C22.5538 16.2466 23.4462 15.6403 24.3077 14.8593V0.465964C27.9618 1.26962 31.2416 3.07434 33.8462 5.57864V24.0462H27.9385C26.7487 24.0462 25.9692 23.5119 25.6 22.4432L25.0154 20.5934C24.4 21.1895 23.7641 21.7341 23.1077 22.2274C22.4513 22.7001 21.7436 23.1111 20.9846 23.4605C20.2462 23.7893 19.4462 24.0462 18.5846 24.2312C17.7231 24.4367 16.7795 24.5395 15.7538 24.5395C14.0103 24.5395 12.4615 24.2415 11.1077 23.6455C9.77436 23.0289 8.64615 22.176 7.72308 21.0867C6.8 19.9974 6.10256 18.7129 5.63077 17.2331C5.15897 15.7534 4.92308 14.1297 4.92308 12.3622V6.87176C7.41833 4.00589 10.7143 1.85803 14.4615 0.778275Z" fill="white"/>
                        </svg>
                        <h2>uevent</h2>
                    </Link>
                    <div className={styles.heading}>
                        <h1 style={{ lineHeight: "90%", marginBottom: "10px" }}>
                            Reset Password
                        </h1>
                        <span>
                            Enter the email address associated with your account
                        </span>
                    </div>
                    {!Object.keys(errors).length == 0 && (
                        <Alert severity="warning" className={styles.errmsg}>
                        {Object.values(errors)[0].message}
                        </Alert>
                    )}
                    {sent && (
                        <Alert severity="success" className={styles.errmsg}>
                        If there is an account associated with this email, we have sent an
                        instructions
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.inputs}>
                        <div className={styles.form}>
                            <label htmlFor="email">Email</label>
                            <div className={styles.field}>
                            <input
                                type="email"
                                id="email"
                                {...register("email", {
                                pattern: {
                                    value:
                                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                    message: "Please, enter a valid email",
                                },
                                })}
                                placeholder='user@example.com'
                            />
                            </div>
                        </div>
                        </div>
                        <div className={styles.button}>
                        <Button type="submit" variant="contained">
                            Send
                        </Button>
                        </div>
                    </form>
                    </div>
                <div className={styles.image}>
                    <div className={styles.text}>
                        <h2>Where memories are made.</h2>
                    </div>
                    <img src='/assets/bgImages/resetpassword.jpg' alt="" />
                </div>
            </section>
        </main>
    )
};

export default ResetPassword;