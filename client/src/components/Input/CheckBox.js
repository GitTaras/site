import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import style from '../../pages/CreateContest/CreateContest.module.sass';

const Checkbox = (props) => {
  const { name, value } = props;
  return (
    <Field name={name}>
      {({ field, form }) => (
        <label>
          <input
            className={style.checkbox}
            type="checkbox"
            {...props}
            checked={field.value.includes(value)}
            onChange={() => {
              if (field.value.includes(value)) {
                const nextValue = field.value.filter(
                  item => item !== value,
                );
                form.setFieldValue(name, nextValue);
              } else {
                const nextValue = field.value.concat(value);
                form.setFieldValue(name, nextValue);
              }
            }}
          />
          {value}
        </label>
      )}
    </Field>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Checkbox;
