import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.sass';

const Button = (props) => {
  const {
    content, btnStyle, onClick, disabled, type,
  } = props;
  const hiddenBtn = disabled && styles.disabled;
  return (
    <button
      type={type}
      className={`${styles[btnStyle]} ${hiddenBtn}`}
      onClick={e => onClick(e)}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

Button.propTypes = {
  content: PropTypes.string.isRequired,
  btnStyle: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  btnStyle: styles.default,
  onClick: () => {},
};

export default Button;
