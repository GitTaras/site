import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import styles from './Payment.module.sass';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { PaymentSchema } from '../../utils/validationForm';

const FormPayment = (props) => {
  const onSubmit = (values, setSubmitting, resetForm) => {
    const { submitAction } = props;
    submitAction(values);
    setSubmitting(false);
    resetForm();
  };

  function renderForm(values, errors, handleChange, handleSubmit) {
    const { serverError, contentSubmit, sum } = props;
    return (
      <form>
        <div className={styles.inputWrapper}>
          <div className={styles.row}>
            <div className={styles.item}>
              <span>Card Number</span>
              <Input
                name="card"
                character="payment"
                placeholder="Card Number"
                wrongdata={errors.card && 'wrongdata'}
                type="text"
                value={values.card}
                onChange={handleChange}
                maxLength="16"
              />
              <div className={errors.card && styles.containerError}>
                {errors.card}
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.item}>
              <span>Expires</span>
              <Input
                name="expires"
                placeholder="Expires"
                character="payment"
                wrongdata={errors.expires && 'wrongdata'}
                type="text"
                value={values.expires}
                onChange={handleChange}
                maxLength="4"
              />
              <div className={errors.expires && styles.containerError}>
                {errors.expires}
              </div>
            </div>
            <div className={styles.item}>
              <span>Security Code</span>
              <Input
                name="cvv"
                placeholder="Security Code"
                character="payment"
                wrongdata={errors.cvv && 'wrongdata'}
                type="password"
                value={values.cvv}
                onChange={handleChange}
                maxLength="3"
              />
              <div className={errors.cvv && styles.containerError}>
                {errors.cvv}
              </div>
            </div>
          </div>
          <div className={serverError && styles.serverError}>
            {serverError}
          </div>
          <div className={styles.row}>
            <div className={styles.resume}>
              <span className={styles.total}>Total:</span>
              <span className={styles.priceTotal}>{`$ ${sum} USD`}</span>
            </div>
          </div>
          <div className={styles.containerAgreement}>
            <input
              type="checkbox"
              name="agreement"
              id="agree"
              value={values.agreement}
              onChange={handleChange}
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
            </span>
          </div>
          <div className={styles.row}>
            <Button
              btnStyle="next"
              content={contentSubmit}
              disabled={!values.agreement || sum <= 0}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </form>
    );
  }

  return (
    <Formik
      initialValues={{
        card: '',
        cvv: '',
        expires: '',
      }}
      validationSchema={PaymentSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values, setSubmitting, resetForm);
      }}
    >
      {({
        values, errors, handleChange, handleSubmit,
      }) => renderForm(values, errors, handleChange, handleSubmit)
      }
    </Formik>
  );
};

FormPayment.propTypes = {
  serverError: PropTypes.string,
};

FormPayment.defaultProps = {
  serverError: '',
};

export default FormPayment;
