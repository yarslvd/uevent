import { useRef, useState, useEffect } from 'react'
import { Modal, Button, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import styles from './SettingsModal.module.scss';

import { useUpdateUserMutation, useUploadAvatarMutation } from '../../redux/api/fetchAuthApi';
import { useTranslation } from 'react-i18next';

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

    const {t} = useTranslation();

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
        if (values.name) {
            const splitted = values.name.split(" ");
            values.first_name = splitted[0]
            values.last_name = splitted[1];
        }

        if (Object.keys(values).length > 0) {
            //data.error + 409 status code- if username is taken
            if(values.username === userInfo.username) {
                delete values.username;
            }

            let data = await updateUser(values);

            if(!data.error) {
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
                    <h1>{t('profile.user.settings')}</h1>
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
                        <Button variant="outlined" onClick={() => {console.log(inputFileRef.current);inputFileRef.current.click();}} className={styles.btn}>{t('profile.settings.upload')}</Button>
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
                            <label htmlFor="username">{t('profile.settings.usernameLabel')}</label>
                            <div className={styles.field}>
                                <input
                                    type="text"
                                    id="username"
                                    minLength={3}
                                    {...register("username")}
                                    placeholder={t('profile.settings.updateUsernamePlaceholder')}
                                />
                            </div>
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="name">{t('profile.settings.fullNameLabel')}</label>
                            <div className={styles.field}>
                            <input
                                type="text"
                                id="name"
                                {...register("name", {
                                    pattern: {
                                        value: /^([\w]{2,})+\s+([\w\s]{2,})+$/i,
                                        message: t('profile.settings.realNameErrorMessage'),
                                    },
                                })}
                                placeholder={t('profile.settings.changeFullNamePlaceholder')}
                            />
                            </div>
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="email">{t('profile.settings.emailLabel')}</label>
                            <div className={styles.field}>
                                <input
                                    type="email"
                                    disabled={true}
                                    id="email"
                                    {...register("email", {
                                        pattern: {
                                            value:
                                            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                            message: t('profile.settings.emailPatternError'),
                                        },
                                    })}
                                    placeholder={t('profile.settings.emailPlaceholder')}
                                />
                            </div>
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="password">{t('profile.settings.newPasswordLabel')}</label>
                            <div className={styles.field}>
                                <input
                                    type="password"
                                    id="password"
                                    {...register("password", {
                                        pattern: {
                                            value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                                            message: t('profile.settings.passwordPatternError'),
                                        },
                                    })}
                                    placeholder={t('profile.settings.newPasswordPlaceholder')}
                                />
                            </div>
                        </div>
                        <div className={styles.form}>
                            <label htmlFor="passwordRepeat">{t('profile.settings.repeatPasswordLabel')}</label>
                            <div className={styles.field}>
                                <input
                                    type="password"
                                    id="passwordRepeat"
                                    {...register("passwordRepeat", {
                                        validate: (value) => {
                                            if (watch("password") !== value) {
                                            return t('profile.settings.passwordMatchError');
                                            }
                                        },
                                    })}
                                    placeholder={t('profile.settings.repeatPasswordPlaceholder')}
                                />
                            </div>
                        </div> 
                    </div>
                    <div>
                        <Button variant="contained" type='submit' className={styles.button}>{t('profile.settings.save')}</Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default SettingsModal;