import {useSelector} from "react-redux";
import {useState} from "react";
import { Link } from "react-router-dom";
import {Avatar, Button, Modal,} from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './Comment.module.scss';
import {useTranslation} from "react-i18next";

const Comment = ({ id, comment, user, setEditing, deleteComment }) => {
    const { t } = useTranslation();
    const { userInfo } = useSelector((state) => state.auth);
    const [modalOpen, setModalOpen] = useState(false);
    const handleClose = () => {
        setModalOpen(false);
    }

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <div className={styles.modalContainer}>
                        <div className={styles.modal}>
                            <p>{t('comments.deleteComment')}</p>
                            <div className={styles.modalButtons}>
                                <Button variant='contained' onClick={() => {deleteComment(id);handleClose()}}>{t('yes')}</Button>
                                <Button variant='contained' onClick={() => handleClose()}>{t('no')}</Button>
                            </div>
                        </div>
                    </div>
                </>
            </Modal>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.content}>
                        <Avatar alt={user.first_name} src={user.image?user.image:"/static/images/avatar/1.jpg"} />
                    </div>
                    <div className={styles.text}>
                        <Link className={styles.username} to={`/user/${user.id}`}>{`${user.first_name} ${user.last_name}`}</Link>
                        <p className={styles.comment}>{comment}</p>
                    </div>
                    {(userInfo?.id === user.id) && (
                        <div className={styles.editButtons}>
                            <ModeIcon
                                className={styles.editButton}
                                onClick={() => setEditing({id:id, content:comment})}/>
                            <DeleteIcon className={styles.deleteButton} onClick={() => setModalOpen(true)}/>
                        </div>
                    )}
                </div>
                <div className={styles.bottom}>
                    19.03.03
                </div>
            </div>
        </>
    );
};

export default Comment;