import React from 'react';
import PropTypes from 'prop-types';
import image from '../../constants/images';
import style from './DashboardHeader.module.sass';
import ProfilePicture from "../ProfilePicture/ProfilePicture";

const DashboardHeader = (props) => {
  const { user, logoff, history } = props;
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.logo} onClick={() => history.push('/')}>
          <img src={image.colorLogo} alt="logo" />
        </div>
        <div className={style.authorization}>
          <ProfilePicture user={user} size={'small'} mediaPhone={'hide'}/>
          <span className={style.sign} onClick={() => history.push('/dashboard/active')}>
            Hi, {user.firstName}
           </span>
          <span className={style.sign} onClick={() => logoff(history, user.id)}>Log out</span>
        </div>
      </div>
    </div>
  );
};


DashboardHeader.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  logoff: PropTypes.func.isRequired,
};

export default DashboardHeader;
