import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import styles from './ContestHoc.module.sass';
import Sidebar from '../../Sidebar/Sidebar';
import {
  currentUser, getContestById, getEntries, logout,
} from '../../../actions/actionCreator';
import DashboardHeader from '../../Header/DashboardHeader';

export default function (OuterComponent) {
  class ContestHoc extends Component {
    componentDidMount() {
      const {
        getCurrentContest, match, getCurrentUser, user,
      } = this.props;
      if (!user) {
        getCurrentUser();
      }
      getCurrentContest(match.params.id);
    }

    render() {
      const { contest, user } = this.props;
      return (!!contest && user)
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
    contest: state.contestReducer.contest,
    allEntries: state.entryReducer.allEntries,
  });

  const mapDispatchToProps = dispatch => ({
    getCurrentContest: id => dispatch(getContestById(id)),
    getCurrentUser: () => dispatch(currentUser()),
    getAllEntries: (field, param, contestId) => dispatch(getEntries(field, param, contestId)),
    logoff: (history, id) => dispatch(logout(history, id)),
  });

  ContestHoc.propTypes = {
    contest: PropTypes.objectOf(PropTypes.any),
    getCurrentContest: PropTypes.func.isRequired,
    getAllEntries: PropTypes.func.isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    logoff: PropTypes.func.isRequired,
  };

  ContestHoc.defaultProps = {
    contest: null,
  };

  return connect(mapStateToProps, mapDispatchToProps)(ContestHoc);
}
