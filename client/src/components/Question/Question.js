import React from 'react';
import image from '../../constants/images';
import styles from './Question.module.sass';
import Button from '../Button/Button';

const Question = () => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <div className={styles.img}>
        <img src={image.envelope} alt="envelope" />
      </div>
      <div className={styles.text}>
        <span>Questions?</span>
        <span>
Check out our FAQs or send us a message. For assistance with launching a contest, you can also call
         us at (877) 355-3585 or schedule a Branding Consultation
        </span>
      </div>
      <div className={styles.getInTouchBtn}>
        <Button btnStyle="question" content="get in touch" />
      </div>
    </div>
  </div>
);

export default Question;
