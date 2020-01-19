import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {currentUser, logout} from '../../actions/actionCreator';
import HomeContent from "./HomeContent";

class Home extends Component {
  componentDidMount() {
    const { getCurrentUser, user } = this.props;
    if (!user) {
      getCurrentUser();
    }
    window.scrollTo(0, 0);
  }

  startContest = () => {
    const { history } = this.props;
    history.push('/contest');
  };

  render() {
    return (
      <HomeContent {...this.props} startContest={this.startContest}/>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.currentUser,
});

const mapDispatchToProps = dispatch => ({
  logoff: (history, id) => dispatch(logout(history, id)),
  getCurrentUser: () => dispatch(currentUser()),
});

Home.propTypes = {
  user: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.any), PropTypes.string]),
  logoff: PropTypes.func,
  getCurrentUser: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any),
};

Home.defaultProps = {
  user: null,
  logoff: () => {},
  history: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
