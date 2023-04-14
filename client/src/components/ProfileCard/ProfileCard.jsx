import { useState } from "react";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../../redux/axios";

import SettingsModal from "../SettingsModal/SettingsModal";

import styles from "./ProfileCard.module.scss";

const ProfileCard = (userinfo) => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

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
            <Avatar src={userinfo.image} alt={userinfo.first_name} className={styles.avatar}></Avatar>
            <div className={styles.displayContainer}>
                <div className={styles.text}>
                    <h3>{`${userinfo.first_name} ${userinfo.last_name}`}</h3>
                    <span>@{userinfo.username}</span>
                </div>
                <div className={styles.buttons}>
                    <Button variant='contained' className={styles.settingsBtn} onClick={() => setModalOpen(true)}>Settings</Button>
                    <Button variant='outlined' className={styles.logoutBtn} onClick={handleLogout}>Log out</Button>
                </div>
            </div>
            <SettingsModal
                open={modalOpen}
                handleClose={handleClose}
                user={userinfo}
            />
        </div>
    );
};

export default ProfileCard;
