import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import styles from './BriefCard.module.sass';

const BriefCard = (props) => {
  const {
    id, name, type, price, isActive, createdAt, businessDo, onClick, countEntries,
  } = props;
  const pastTime = moment(createdAt).toNow(true);
  const inactiveItem = _.isNull(isActive) && styles.inactiveItem;
  const getStatus = () => {
    if (isActive) {
      return (
        <div className={styles.costAndStatus}>
          <div className={styles.icons}>
            <i className={`fa fa-fw fa-check-circle ${styles.activeIcon}`} />
          </div>
          <span>Active</span>
        </div>
      );
    } if (_.isNull(isActive)) {
      return (
        <div className={styles.costAndStatus}>
          <div className={styles.icons}>
            <i className={`fa fa-pause-circle ${styles.inactiveIcon}`} />
          </div>
          <span>Inactive</span>
        </div>
      );
    }
    return (
      <div className={styles.costAndStatus}>
        <div className={styles.icons}>
          <i className={`fa fa-fw fa-check-circle ${styles.closedIcon}`} />
        </div>
        <span>Closed</span>
      </div>
    );
  };
  return (
    <div className={`${styles.container} ${inactiveItem} `} onClick={() => onClick(id)}>
      <div className={styles.info}>
        <div className={styles.title}>
          <span className={styles.name}>{name}</span>
          <span className={styles.id}>{`#${id}`}</span>
        </div>
        <span className={styles.type}>{`Type: ${type}`}</span>
        <span className={styles.description}>{businessDo}</span>
        <div className={styles.extraInfo}>
          <div className={styles.costAndStatus}>
            <div className={styles.icons}>
              <i className="fa fa-diamond" />
            </div>
            <span>{`$ ${price}`}</span>
          </div>
          {getStatus()}
        </div>
      </div>
      <div className={styles.dataWrapper}>
        <div className={styles.data}>
          <div className={styles.entries}>
            <div className={styles.iconAndInfo}>
              <div className={styles.icons}>
                <i className="fa fa-user" />
              </div>
              <span>{countEntries}</span>
            </div>
            <span className={styles.textInfo}>Entries</span>
          </div>
          <div className={styles.leftTime}>
            <span>{pastTime}</span>
            <span className={styles.textInfo}>Past</span>
          </div>
        </div>
        <div className={styles.winner}>
          <i className="fa fa-trophy" />
          <span>Tier a creatives only</span>
        </div>
      </div>
    </div>
  );
};


BriefCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
  price: PropTypes.number,
  isActive: PropTypes.bool,
  createdAt: PropTypes.string,
  businessDo: PropTypes.string,
  onClick: PropTypes.func,
};

BriefCard.defaultProps = {
  onClick: () => {},
  isActive: null,
  id: null,
  name: '',
  type: '',
  price: 0,
  createdAt: '',
  businessDo: '',
};

const mapStateToProps = state => ({
  contest: state.contestReducer.contest,
});

export default connect(mapStateToProps)(BriefCard);
