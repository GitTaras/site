import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BeatLoader } from 'react-spinners';
import { currentUser, logout } from '../../../actions/actionCreator';
import Footer from '../../Footer/Footer';
import styles from './PrivateHoc.module.sass';
import DashboardHeader from "../../Header/DashboardHeader";

export default function (OuterComponent) {
  class PrivateHoc extends Component {
    componentDidMount() {
      const { user, getCurrentUser } = this.props;
      if (!user) {
        getCurrentUser();
      }
    }

    render() {
      const { user, logoff, history } = this.props;
      return user ? (
        <>
          <DashboardHeader history={history} user={user} logoff={logoff}/>
          <OuterComponent {...this.props} />
          <Footer />
        </>
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
  });

  const mapDispatchToProps = dispatch => ({
    getCurrentUser: () => dispatch(currentUser()),
    logoff: (history, id) => dispatch(logout(history, id)),
  });

  PrivateHoc.propTypes = {
    user: PropTypes.objectOf(PropTypes.any),
    getCurrentUser: PropTypes.func,
    logoff: PropTypes.func.isRequired,
  };

  PrivateHoc.defaultProps = {
    user: null,
    logoff: () => {},
    getCurrentUser: () => {},
  };

  return connect(mapStateToProps, mapDispatchToProps)(PrivateHoc);
}
