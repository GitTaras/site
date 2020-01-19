import React from 'react';
import Button from '../../components/Button/Button';
import styles from './NotFound.module.sass';

const NotFound = (props) => {
  const {history} = props;
  return <div className={styles.container}>
    <h1 className={styles.text}>NOT FOUND :(</h1>
    <Button content={'go home'} onClick={() => history.replace('/')} btnStyle={'addContest'}/>
  </div>
};
export default NotFound;
