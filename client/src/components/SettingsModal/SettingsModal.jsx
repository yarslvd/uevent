import { useRef, useState, useEffect } from 'react'
import { Modal, Button, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import styles from './SettingsModal.module.scss';

import { useUpdateUserMutation, useUploadAvatarMutation } from '../../redux/api/fetchAuthApi';

function removeEmptyFields(data) {
    Object.keys(data).forEach(key => {
      if (data[key] === '') {
        delete data[key];
      }
    });
  }

const SettingsModal = ({ open, handleClose, user }) => {
    const inputFileRef = useRef(null);
    const [imageUrl, setImageUrl] = useState(user?user.image:"");
    const [uploadAvatar] = useUploadAvatarMutation();
    const [updateUser, { error: mutationError }] = useUpdateUserMutation();
    const [avatar, setAvatar] = useState(null);
    const [displayError, setDisplayError] = useState("");

    const { userInfo } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            username: user?user.username:"",
            email:user?user.email:"",
            password: '',
            passwordRepeat: '',
            name: user?user.first_name+" "+user.last_name:"",
        },
        mode: 'onSubmit'
    });

    const handleChangeFile = (event) => {
        setImageUrl(URL.createObjectURL(event.target.files[0]));
        setAvatar(event.target.files[0]);
    }

    const onSubmit = async (values) => {
        if(avatar) {
            const formData = new FormData();
            formData.append('avatar', avatar);
            await uploadAvatar({file: formData});
        }
        
        removeEmptyFields(values);
        if (values.full_name) {
            const splitted = values.full_name.split(" ");
            values.first_name = splitted[0]
            values.last_name = splitted[1];
        }

        if (Object.keys(values).length > 0) {
            //data.error + 409 status code- if username is taken
            let data = await updateUser(values);
            if(!data.error || values.username === userInfo.username) {
                handleClose();
                window.location.reload();
            }
        }
    }

    useEffect(() => {
        setDisplayError(mutationError?.data?.error);
    }, [updateUser, mutationError != undefined]);

    useEffect(() => {
        setDisplayError('');
    }, [Object.entries(errors).length > 0]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="settings-title"
            aria-describedby="Manage your personal settings"
        >
            <div className={styles.container}>
                <div className={styles.heading}>
                    <h1>Settings</h1>
                    <div onClick={handleClose} className={styles.close_btn}>
                        <svg focusable="true" aria-hidden="true" viewBox="0 0 24 24">
                            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </svg>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={styles.updateAvatar}>
                        <div className={styles.previewAvatar} style={{
                            backgroundImage:`url(${imageUrl ? imageUrl : user.image})`,
                            backgroundSize: 'cover',
                        }}></div>
                        <Button variant="outlined" onClick={() => {console.log(inputFileRef.current);inputFileRef.current.click();}} className={styles.btn}>Upload</Button>
                        <input
                            id="avatar"
                            type='file'
                            hidden
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={(e)=>{handleChangeFile(e)}}
                            ref={inputFileRef}
                        />
                    </div>
                    <div className={styles.inputs}>
                        <div className={styles.errors}>
                            {!Object.keys(errors).length == 0 && (
                                <Alert severity="warning" style={{ borderRadius: '10px'}}>
                                    {Object.values(errors)[0].message}
                                </Alert>
                            )}
                            {displayError && <Alert severity="error" style={{ borderRadius: '10px'}}>{displayError}</Alert>}
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="username">Username</label>
                            <div className={styles.field}>
                                <input
                                    type="text"
                                    id="username"
                                    minLength={3}
                                    {...register("username")}
                                    placeholder='Update username'
                                />
                            </div>
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="name">Full Name</label>
                            <div className={styles.field}>
                            <input
                                type="text"
                                id="name"
                                {...register("name", {
                                    pattern: {
                                        value: /^([\w]{2,})+\s+([\w\s]{2,})+$/i,
                                        message: "Please, enter your real name",
                                    },
                                })}
                                placeholder='Change full name'
                            />
                            </div>
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="email">Email</label>
                            <div className={styles.field}>
                            <input
                                type="email"
                                disabled={true}
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
                            <label htmlFor="password">New password</label>
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
                            <label htmlFor="passwordRepeat">Repeat new password</label>
                            <div className={styles.field}>
                            <input
                                type="password"
                                id="passwordRepeat"
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