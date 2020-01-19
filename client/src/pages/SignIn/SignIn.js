import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '../../components/Button/Button';
import { auth } from '../../actions/actionCreator';
import styles from './SignIn.module.sass';
import images from '../../constants/images';
import { asyncValidate } from '../../utils/validateReduxForm';
import Input from '../../components/Input/Input';

const renderField = ({ placeholder, input, type, meta: { error }}) => (
  <>
    <div className={styles.containerInput}>
      <Input {...input} type={type} placeholder={placeholder} wrongdata={error && 'wrongdata'} />
    </div>
    <div className={error && styles.containerError}>
      {error && <span>{error}</span>}
    </div>
  </>
);

let SignIn = (props) => {
  const { serverError, history } = props;

  const onSubmit = (event) => {
    event.preventDefault();
    const { login, history, fields } = props;
    login(fields.values, history);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={images.logo} alt="logo" onClick={() => history.push('/')} />
        <Button content="Signup" btnStyle="sign" onClick={() => history.push('/signup')} />
      </div>
      <div className={styles.container}>
        <div className={styles.mainText}>login to your account</div>
        <div className={serverError && styles.serverError}>
          {serverError}
        </div>
        <form>
          <Field
            placeholder="Email address"
            type="email"
            name="email"
            component={renderField}
          />
          <Field
            placeholder="Password"
            type="password"
            name="password"
            component={renderField}
          />
          <div className={styles.remember}>
            <input type="checkbox" name="remember" value="remember" />
            <span>Remember me</span>
          </div>
          <Button content="Login" btnStyle="create" type="submit" onClick={onSubmit} />
        </form>
      </div>
    </div>
  );
};


SignIn = reduxForm({
  form: 'signIn',
  asyncValidate,
})(SignIn);

const mapStateToProps = state => ({
  serverError: state.authReducer.error,
  fields: state.form.signIn,
});

const mapDispatchToProps = dispatch => ({
  login: (user, history) => dispatch(auth(user, history)),
});

SignIn.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  serverError: PropTypes.string,
  login: PropTypes.func.isRequired,
};

SignIn.defaultProps = {
  serverError: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
