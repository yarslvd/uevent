import { Avatar } from '@mui/material';

import styles from './Comment.module.scss';

const Comment = ({ user_id, comment }) => {


    return (
      <div className={styles.container}>
        <div className={styles.top}>
            <div className={styles.content}>
                <Avatar alt={user_id} src="/static/images/avatar/1.jpg" />
            </div>
            <div className={styles.text}>
                <span className={styles.username}>фцвфцв</span>
                <p className={styles.comment}>{comment}</p>
            </div>
        </div>
        <div className={styles.bottom}>
            19.03.03
        </div>
      </div>
    );
};

export default Comment;