import {Avatar, Button, Modal,} from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './Comment.module.scss';
import {useSelector} from "react-redux";
import {useState} from "react";

const Comment = ({ id, comment, user, setEditing, deleteComment }) => {
    const { userInfo } = useSelector((state) => state.auth);
    const [modalOpen, setModalOpen] = useState(false);
    console.log(user)
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
                            <p >Ви впевнені , що хочете видалити коментар?</p>
                            <div className={styles.modalButtons}>
                                <Button variant='contained' onClick={() => {deleteComment(id);handleClose()}}>Так</Button>
                                <Button variant='contained' onClick={() => handleClose()}>Ні</Button>
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
                        <span className={styles.username}>{`${user.first_name} ${user.last_name}`}</span>
                        <p className={styles.comment}>{comment}</p>
                    </div>
                    {(userInfo.id === user.id) && (
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