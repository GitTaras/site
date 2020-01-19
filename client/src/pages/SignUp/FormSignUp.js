import React, { useState } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import styles from './SignUp.module.sass';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import NDAModal from './NDAModal';
import { SignupSchema } from '../../utils/validationForm';

const FormSignUp = (props) => {
  const { serverError } = props;
  const [modal, isShow] = useState(false);

  function onSubmit(values, setSubmitting) {
    const { createUser, history } = props;
    createUser(values, history);
    setSubmitting(false);
  }

  function renderForm(values, errors, handleChange, handleSubmit) {
    return (
      <form>
        <div className={styles.wrapperInput}>
          <div className={serverError && styles.serverError}>
            {serverError}
          </div>
          <div className={styles.row}>
            <div className={styles.containerInput}>
              <Input
                wrongdata={errors.firstName && 'wrongdata'}
                type="text"
                name="firstName"
                value={values.firstName}
                placeholder="First Name"
                onChange={handleChange}
              />
            </div>
            <div className={styles.containerInput}>
              <Input
                wrongdata={errors.lastName && 'wrongdata'}
                placeholder="Last Name"
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={(errors.firstName || errors.lastName) && styles.containerError}>
            {errors.firstName || errors.lastName}
          </div>
        </div>
        <div className={styles.wrapperInput}>
          <div className={styles.containerInput}>
            <Input
              wrongdata={errors.email && 'wrongdata'}
              type="email"
              name="email"
              value={values.email}
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>
          <div className={`${errors.email && styles.containerError}`}>
            {errors.email}
          </div>
        </div>
        <div className={styles.wrapperInput}>
          <div className={styles.row}>
            <div className={styles.containerInput}>
              <Input
                wrongdata={errors.password && 'wrongdata'}
                placeholder="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <div className={styles.containerInput}>
              <Input
                wrongdata={errors.repeatPass && 'wrongdata'}
                type="password"
                name="repeatPass"
                value={values.repeatPass}
                placeholder="Password Confirmation"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={`${(errors.repeatPass || errors.password) && styles.containerError}`}>
            {errors.password || errors.repeatPass}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.containerRole}>
            <div className={styles.radioBtn}>
              <input
                type="radio"
                name="role"
                value="buyer"
                checked={values.role === 'buyer'}
                onChange={handleChange}
                id="buyer"
              />
            </div>
            <div className={styles.radioLabel}>
              <label htmlFor="buyer">Join As a Buyer</label>
              <label htmlFor="buyer">I am looking for a Name, Logo or Tagline for my business, brand or product.</label>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.containerRole}>
            <div className={styles.radioBtn}>
              <input
                type="radio"
                name="role"
                value="creative"
                checked={values.role === 'creative'}
                onChange={handleChange}
                id="creative"
              />
            </div>
            <div className={styles.radioLabel}>
              <label htmlFor="creative">Join As a Creative</label>
              <label htmlFor="creative">
                I plan to submit name ideas, Logo designs or sell names in Domain
                Marketplace.
              </label>
            </div>
          </div>
        </div>

        <div className={styles.containerAgreement}>
          <input
            type="checkbox"
            value={!values.agreement}
            onChange={handleChange}
            name="agreement"
            id="agree"
          />
          <span>
I read and agree with
            <a
              href="https://www.squadhelp.com/Terms&Conditions"
              target="_blank"
              rel="noopener noreferrer"
            >
Terms of Service
            </a>
            { values.role === 'creative' && (
            <>
              <span>&</span>
              <span className={styles.NDA} onClick={() => isShow(true)}>Non-Disclosure Agreement</span>
            </>
            )}
          </span>
        </div>
        <Modal open={modal} onClose={() => isShow(false)} center>
          <NDAModal />
        </Modal>
        <div className={styles.createAccount}>
          <Button
            type="submit"
            content="Create account"
            btnStyle="create"
            disabled={!values.agreement}
            onClick={handleSubmit}
          />
        </div>
      </form>
    );
  }

  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        repeatPass: '',
        role: 'creative',
        agreement: false,
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values, setSubmitting);
      }}
    >
      {({
        values, errors, handleChange, handleSubmit,
      }) => renderForm(values, errors, handleChange, handleSubmit)
      }
    </Formik>
  );
};

FormSignUp.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  serverError: PropTypes.objectOf(PropTypes.any),
  createUser: PropTypes.func.isRequired,
};

FormSignUp.defaultProps = {
  serverError: null,
};

export default FormSignUp;
