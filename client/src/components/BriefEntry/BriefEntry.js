import React from 'react';
import PropTypes from 'prop-types';
import styles from './BriefEntry.module.sass';

const BriefEntry = (props) => {
  const {
    suggestion
  } = props;

  return (
    <div className={styles.wrapper}>
      <span className={styles.suggestion}>{suggestion}</span>
    </div>
  );
};

BriefEntry.propTypes = {
  suggestion: PropTypes.string.isRequired,
};

export default BriefEntry;
