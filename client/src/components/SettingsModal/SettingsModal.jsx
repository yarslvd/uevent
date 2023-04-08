import { useRef } from 'react'
import { Modal, Button, Avatar, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';

import styles from './SettingsModal.module.scss';

const SettingsModal = ({ open, handleClose }) => {
    const inputFileRef = useRef(null);

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            login: '',
            password: '',
            passwordRepeat: '',
            fullname: ''
        },
        mode: 'onSubmit'
    });

    const handleChangeFile = (event) => {
        console.log(event);
    }

    const onSubmit = (values) => {
        console.log(values);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="settings-title"
            aria-describedby="Manage your personal settings"
        >
            <div className={styles.container}>
                <div className={styles.heading}>
                    {/* <IconButton onClick={handleClose} aria-label='go back' className={styles.backBtn}><ArrowBackIcon/></IconButton> */}
                    <h1>Settings</h1>
                    <div onClick={handleClose} className={styles.close_btn}>
                        <svg focusable="true" aria-hidden="true" viewBox="0 0 24 24">
                            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </svg>
                    </div>
                </div>
                <form onSubmit={handleSubmit()}>

                    {/* {!Object.keys(errors).length == 0 && <Alert severity="warning" className={styles.errmsg}>{Object.values(errors)[0].message}</Alert>}
                    {error && <Alert severity="error" className={styles.errmsg}>{error}</Alert>}
                    {data && window.location.reload() && <Alert severity="success" className={styles.errmsg}>{data}</Alert>} */}

                    <div className={styles.updateAvatar}>
                        <Avatar src='asd' alt={'awdwd'} className={styles.previewAvatar}></Avatar>
                        <Button variant="outlined" onClick={() => inputFileRef.current.click()} className={styles.btn}>Upload</Button>
                        <input
                            ref={inputFileRef}
                            type='file'
                            onChange={handleChangeFile}
                            hidden
                            accept="image/png, image/jpg, image/jpeg"
                        >
                        </input>
                    </div>
                    <div className={styles.inputs}>
                        <div className={styles.errors}>
                            {!Object.keys(errors).length == 0 && (
                                <Alert severity="warning" style={{ borderRadius: '10px'}}>
                                    {Object.values(errors)[0].message}
                                </Alert>
                            )}
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="username">Username</label>
                            <div className={styles.field}>
                                <input
                                    type="text"
                                    id="username"
                                    minLength={3}
                                    {...register("username")}
                                    placeholder='Create username'
                                />
                            </div>
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="name">Full Name</label>
                            <div className={styles.field}>
                            <input
                                type="text"
                                id="name"
                                {...register("full_name", {
                                    pattern: {
                                        value: /^([\w]{2,})+\s+([\w\s]{2,})+$/i,
                                        message: "Please, enter your real name",
                                    },
                                })}
                                placeholder='Your name'
                            />
                            </div>
                        </div>
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
                        <div className={styles.form}>
                            <label htmlFor="password">Password</label>
                            <div className={styles.field}>
                            <input
                                type="password"
                                id="password"
                                {...register("password", {
                                    pattern: {
                                        value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                                        message: "Password is not strong enough",
                                    },
                                })}
                                placeholder='Create password'
                            />
                            </div>
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="confirm">Repeat Password</label>
                            <div className={styles.field}>
                            <input
                                type="password"
                                id="confirm"
                                {...register("passwordRepeat", {
                                    validate: (value) => {
                                        if (watch("password") !== value) {
                                        return "Your passwords do no match";
                                        }
                                    },
                                })}
                                placeholder='Repeat password'
                            />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button variant="contained" type='submit' className={styles.button}>Save</Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default SettingsModal;