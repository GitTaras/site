import React from 'react';
import PropTypes from 'prop-types';
import Button from "../Button/Button";
import style from './MyTab.module.sass'

const ConfirmModal = (props) => {
  const {onClose, Confirm, srcImg} = props;

  if(srcImg){
    return <div className={style.containerImg}>
      <img src={srcImg} alt="img"/>
    </div>
  }
  return <div className={style.modal}>
    <h3>CONFIRMATION</h3>
    <span>Are you sure?</span>
    <div className={style.buttons}>
      <Button content={'Yes'} onClick={Confirm} btnStyle={'modalEntry'}/>
      <Button content={'Cancel'} onClick={onClose} btnStyle={'modalEntry'}/>
    </div>
  </div>

};

ConfirmModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  Confirm: PropTypes.func.isRequired,
};

ConfirmModal.defaultProps = {
  onClose: () => {},
};

export default ConfirmModal;