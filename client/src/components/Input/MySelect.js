import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const MySelect = (props) => {
  const { onChange, name } = props;

  const handleChange = (e) => {
    onChange(name, e);
  };

  return (
    <Select
      {...props}
      onChange={handleChange}
    />
  );
};

MySelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any),
  isMulti: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

MySelect.defaultProps = {
  options: [],
  isMulti: false,
  name: '',
};

export default MySelect;
