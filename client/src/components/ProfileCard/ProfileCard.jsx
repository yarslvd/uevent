import { useState } from "react";
import { Avatar, Button } from "@mui/material";
import { useSelector } from "react-redux";

import SettingsModal from "../SettingsModal/SettingsModal";

import styles from "./ProfileCard.module.scss";

const ProfileCard = ({ first_name, last_name, username, image }) => {
    const [modalOpen, setModalOpen] = useState(false);
    console.log(modalOpen);

    const handleClose = () => {
        setModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <Avatar src={image} alt={first_name} className={styles.avatar}></Avatar>
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
                image={image}
                fullname={`${first_name} ${last_name}`}
                username={username}
            />
        </div>
    );
};

export default ProfileCard;
