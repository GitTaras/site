import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BeatLoader } from 'react-spinners';
import Sidebar from '../../Sidebar/Sidebar';
import styles from './DashboardHoc.module.sass';
import { currentUser, getContests, getEntries, logout } from '../../../actions/actionCreator';
import DashboardHeader from '../../Header/DashboardHeader';

export default function (OuterComponent) {
  class DashboardHoc extends Component {
    componentDidMount() {
      const { user, getCurrentUser } = this.props;
      if (!user) {
        getCurrentUser();
      }
    }

    render() {
      const { user } = this.props;
      return user
        ? (
          <div className={styles.container}>
            <Sidebar {...this.props} />
            <div className={styles.wrapper}>
              <DashboardHeader {...this.props} />
              <OuterComponent {...this.props} />
            </div>
          </div>
        )
        : (
          <div className={styles.spinner}>
            <BeatLoader
              sizeUnit="px"
              size={20}
              color="#28d2d0"
            />
          </div>
        );
    }
  }

  const mapStateToProps = state => ({
    user: state.authReducer.currentUser,
    allContests: state.contestReducer.allContests,
  });

  const mapDispatchToProps = dispatch => ({
    getCurrentUser: () => dispatch(currentUser()),
    getAllContests: () => dispatch(getContests()),
    getAllEntries: (field, param, contestId) => dispatch(getEntries(field, param, contestId)),
    logoff: (history, id) => dispatch(logout(history, id)),
  });

  DashboardHoc.propTypes = {
    getCurrentUser: PropTypes.func.isRequired,
    getAllContests: PropTypes.func.isRequired,
    logoff: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, mapDispatchToProps)(DashboardHoc);
}
