import { useState } from "react";
import { Avatar, Button } from "@mui/material";

import SettingsModal from "../SettingsModal/SettingsModal";

import styles from "./ProfileCard.module.scss";

const ProfileCard = ({ first_name, last_name, username, avatar_img }) => {
    const [modalOpen, setModalOpen] = useState(false);
    console.log(modalOpen);

    const handleClose = () => {
        setModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <Avatar src={`link`} alt={`Fullname`} className={styles.avatar}></Avatar>
            <div className={styles.displayContainer}>
                <div className={styles.text}>
                    <h3>{`${first_name} ${last_name}`}</h3>
                    <span>@{username}</span>
                </div>
                <Button variant='contained' className={styles.settingsBtn} onClick={() => setModalOpen(true)}>Settings</Button>
            </div>
            <SettingsModal
                open={modalOpen}
                handleClose={handleClose}
            />
        </div>
    );
};

export default ProfileCard;
