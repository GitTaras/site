import React from 'react';
import styles from './Footer.module.sass';
import image from '../../constants/images';

const Footer = () => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <div className={styles.companyInfo}>
        <img src={image.logo} alt="logo" />
        <span>Copyright © 2019 Squadhelp Inc</span>
      </div>
      <div className={styles.socialNetwork}>
        <div className={styles.network}>
          <img src={image.facebook} alt="facebook" />
        </div>
        <div className={styles.network}>
          <img src={image.google} alt="google" />
        </div>
        <div className={styles.network}>
          <img src={image.twitter} alt="twitter" />
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
