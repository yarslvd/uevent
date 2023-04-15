import styles from './NotFoundPage.module.scss';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            <h1>Oops! The page you're looking for cannot be found.</h1>
            <p>Please check the URL or go to the homepage.</p>
            <Button variant='contained' className={styles.redirect_btn} onClick={() => navigate('/')}>Go main</Button>
        </div>
    );
};

export default NotFoundPage;