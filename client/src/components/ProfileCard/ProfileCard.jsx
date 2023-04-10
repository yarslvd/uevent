import { useState } from "react";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../../redux/axios";

import SettingsModal from "../SettingsModal/SettingsModal";

import styles from "./ProfileCard.module.scss";

const ProfileCard = ({ first_name, last_name, username, image }) => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    console.log(modalOpen);

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleLogout = async () => {
        axios.post('/api/auth/logout');
        navigate('/');
        window.location.reload();
    }

    return (
        <div className={styles.container}>
            <Avatar src={image} alt={first_name} className={styles.avatar}></Avatar>
            <div className={styles.displayContainer}>
                <div className={styles.text}>
                    <h3>{`${first_name} ${last_name}`}</h3>
                    <span>@{username}</span>
                </div>
                <div className={styles.buttons}>
                    <Button variant='contained' className={styles.settingsBtn} onClick={() => setModalOpen(true)}>Settings</Button>
                    <Button variant='outlined' className={styles.logoutBtn} onClick={handleLogout}>Log out</Button>
                </div>
            </div>
            <SettingsModal
                open={modalOpen}
                handleClose={handleClose}
                image={image}
                fullname={`${first_name} ${last_name}`}
                username={username}
            />
        </div>
    );
};

export default ProfileCard;
