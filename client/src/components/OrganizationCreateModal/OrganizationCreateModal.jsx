import { useRef, useState } from 'react'
import { Modal, Button, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';

import styles from './OrganizationCreateModal.module.scss';

import { useNewOrganizationMutation, useUploadAvatarMutation } from '../../redux/api/fetchOrganizersApi';

const OrganizationCreateModal = ({ open, handleClose }) => {
    const inputFileRef = useRef(null);
    const [avatar, setAvatar] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const [newOrganization] = useNewOrganizationMutation();
    const [uploadAvatar] = useUploadAvatarMutation();
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

    const onSubmit = async (values) => {
        //removeEmptyFields(values);
        if (values.full_name) {
            const splitted = values.full_name.split(" ");
            values.first_name = splitted[0]
            values.last_name = splitted[1];
        }

        if (Object.keys(values).length > 0) {
            let res = await newOrganization(values);
            console.log({res});

            if(avatar) {
                const formData = new FormData();
                formData.append('avatar', avatar);
                await uploadAvatar({file: formData, id: res.data.organizer.id});
            }
        }

        handleClose();
    }

    const handleChangeFile = (event) => {
        setImageUrl(URL.createObjectURL(event.target.files[0]));
        setAvatar(event.target.files[0]);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="settings-title"
            aria-describedby="Manage your personal settings"
        >
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>Create Organization</h2>
                    <div onClick={handleClose} className={styles.close_btn}>
                        <svg focusable="true" aria-hidden="true" viewBox="0 0 24 24">
                            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </svg>
                    </div>
                </div>
                <div className={styles.content}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.updateAvatar}>
                            <div className={styles.previewAvatar} style={{
                                backgroundImage:`url(${imageUrl})`,
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
                            </div>

                            <div className={styles.form}>
                                <label htmlFor="name">Organization Name</label>
                                <div className={styles.field}>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        minLength={3}
                                        {...register("name")}
                                        placeholder='Create name'
                                    />
                                </div>
                            </div>
                            <div className={styles.form}>
                                <label htmlFor="email">Organization Email</label>
                                <div className={styles.field}>
                                    <input
                                        type="email"
                                        id="email"
                                        required
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
                                <label htmlFor="email">Description</label>
                                <div className={`${styles.field} ${styles.fieldTextarea}`}>
                                    <textarea
                                        name="description"
                                        id="description"
                                        required
                                        placeholder='Information about organization'
                                        className={styles.textarea}
                                        {...register("description")}
                                    >
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button variant="contained" type='submit' className={styles.button}>Save</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default OrganizationCreateModal;