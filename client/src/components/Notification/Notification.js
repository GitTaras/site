import React from 'react';
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import styles from './Notification.module.sass';
import ProfilePicture from "../ProfilePicture/ProfilePicture";

export const infoToast = (message) => {
  toast.info(message, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Flip,
  });
};

export const toastSuccess = (message) => {
  toast.success(message, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Flip,
  });
};

export const toastError = (message) => {
  toast.error(message, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Flip,
  });
};

const renderMessage = (message, user) => (
  <div className={styles.container}>
    <ProfilePicture user={user} size={'chatNotification'}/>
    <div className={styles.info}>
      <span className={styles.userInfo}>{`${user.firstName} ${user.lastName}`}</span>
      <span className={styles.content}>{message.content}</span>
    </div>
  </div>
);

export const notificationNewMessage = (message, user) => {
  toast.info(renderMessage(message, user), {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Flip,
  });
};
