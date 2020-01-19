import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import FormSignUp from './FormSignUp';
import Info from './Info';
import images from '../../constants/images';
import styles from './SignUp.module.sass';
import { createNewUser } from '../../actions/actionCreator';

class SignUp extends Component {

  render() {
    const { error, history } = this.props;
    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <img src={images.logo} alt="logo" onClick={() => history.push('/')} />
            <Button content="Login" btnStyle="sign" onClick={() => history.push('/signin')}  />
          </div>
          <div className={styles.container}>
            <div className={styles.mainText}>CREATE AN ACCOUNT</div>
            <div className={styles.extraText}>
              We always keep your name and email address private.
            </div>
            <FormSignUp {...this.props} serverError={error} />
          </div>
        </div>
        <Info />
      </>
    );
  }
}

const mapStateToProps = state => ({
  error: state.authReducer.error,
});

const mapDispatchToProps = dispatch => ({
  createUser: (user, history) => dispatch(createNewUser(user, history)),
});

SignUp.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  error: PropTypes.objectOf(PropTypes.any),
  createUser: PropTypes.func.isRequired,
};

SignUp.defaultProps = {
  error: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
