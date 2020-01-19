import React from 'react';
import PropTypes from 'prop-types';
import image from '../../constants/images';
import style from './Header.module.sass';

const Header = (props) => {
  const { history } = props;
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.phone}>
          <img src={image.phone} alt="phone" onClick={() => history.push('/')}/>
          <span>(877) 355-3585</span>
        </div>
        <div className={style.authorization}>
          <span className={style.sign} onClick={() => history.push('/signup')}>Sign up</span>
          <span className={style.sign} onClick={() => history.push('/signin')}>Login</span>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Header;
