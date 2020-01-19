import React from 'react';
import PropTypes from 'prop-types';
import style from './PreviewImg.module.sass';

const PreviewImg = (props) => {
  const {srcImg} = props;

  return <div className={style.containerImg}>
    <img src={srcImg} alt="Img"/>
  </div>

};

PreviewImg.propTypes = {
  srcImg: PropTypes.string.isRequired,
};

export default PreviewImg;