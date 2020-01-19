import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.sass';

const Card = (props) => {
  const {
    type, description, img,
    darkTheme, secondImg, thirdImg,
    imgColor, secondImgColor, thirdImgColor, onClick,
  } = props;
  const dark = darkTheme && styles.darkTheme;
  return (
    <div className={`${styles.container} ${dark}`} onClick={e => onClick(e)}>
      <div className={styles.img}>
        <img src={img} alt="imagGay" />
        {secondImg && <img src={secondImg} alt="secondImgGrey" />}
        {thirdImg && <img src={thirdImg} alt="thirdImgGrey" />}
      </div>
      <div className={styles.imgColor}>
        <img src={imgColor} alt="imagColor" />
        {secondImgColor && <img src={secondImgColor} alt="secondImgColor" />}
        {thirdImgColor && <img src={thirdImgColor} alt="thirdImgColor" />}
      </div>
      <div className={styles.name}>{type}</div>
      <hr className={styles.line} />
      <div className={styles.description}>{description}</div>
    </div>
  );
};


Card.propTypes = {
  type: PropTypes.string.isRequired,
  description: PropTypes.string,
  img: PropTypes.string,
  darkTheme: PropTypes.bool,
  secondImg: PropTypes.string,
  thirdImg: PropTypes.string,
  imgColor: PropTypes.string,
  secondImgColor: PropTypes.string,
  thirdImgColor: PropTypes.string,
  onClick: PropTypes.func,
};

Card.defaultProps = {
  description: '',
  img: '',
  darkTheme: false,
  secondImg: '',
  thirdImg: '',
  imgColor: '',
  secondImgColor: '',
  thirdImgColor: '',
  onClick: () => {},
};

export default Card;
