import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.sass';

const Input = (props) => {
  const { onChange, wrongdata, character } = props;
  const warning = wrongdata && styles.wrongdata;
  return (
    <input
      {...props}
      onChange={e => onChange(e)}
      className={`${styles.inputStyle} ${styles[character]} ${warning}`}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  maxLength: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  wrongdata: PropTypes.string,
  character: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.any),
  ]),
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  wrongdata: '',
  character: '',
  value: '',
  maxLength: '300',
  onChange: () => {},
};

export default Input;
