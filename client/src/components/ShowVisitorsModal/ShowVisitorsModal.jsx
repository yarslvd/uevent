import React from 'react'
import { Modal, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './ShowVisitorsModal.module.scss';
import { useTranslation } from 'react-i18next';

const ShowVisitorsModal = ({ open, handleClose, tickets, isLoading }) => {
  console.log(tickets);
  const {t} = useTranslation();

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="All visitors modal menu"
        aria-describedby="Check who is going to event"
    >
        <div className={styles.container}>
          <div className={styles.header}>
              <h2>{t('eventPage.modalWindow.visitors')}</h2>
              <div onClick={handleClose} className={styles.close_btn}>
                  <svg focusable="true" aria-hidden="true" viewBox="0 0 24 24">
                      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                  </svg>
              </div>
          </div>
          <div className={styles.content}>
            {!isLoading && [...new Set(tickets.map(el => JSON.stringify(el)))].map((el, index) => {
              el = JSON.parse(el);
              if(el.can_show) {
                return (
                  <Link to={`/user/${el.user.id}`} key={index}>
                    <div className={styles.visitorContainer}>
                      <Avatar alt={el.user.first_name+el.user.last_name} src={el.user.image?el.user.image:`/static/images/avatar/1.jpg`} className={styles.avatar}></Avatar>
                      <span>{el.user.first_name} {el.user.last_name}</span>
                    </div>
                  </Link>
                )
              }
            })}
          </div>
        </div>
    </Modal>
  )
}

export default ShowVisitorsModal