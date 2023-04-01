import { Avatar } from '@mui/material';

import styles from './Comment.module.scss';

const Comment = ({ fullname, comment }) => {
    return (
      <div className={styles.container}>
        <div className={styles.top}>
            <div className={styles.content}>
                <Avatar alt={fullname} src="/static/images/avatar/1.jpg" />
            </div>
            <div className={styles.text}>
                <span className={styles.name}>{fullname}</span>
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