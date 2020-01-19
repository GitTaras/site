import * as Yup from 'yup';

export const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email').trim().required('Required'),
  password: Yup.string().trim().min(6, 'min length is 6 charts!')
    .max(50, 'max length is 50 charts!')
    .required('Required'),
});

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Required').trim().min(2, 'min length is 2 charts')
    .max(16, 'max length is 16 charts').matches(/^[a-z ,.'-]+$/i, 'You can use only letters'),
  lastName: Yup.string().required('Required').trim().min(2, 'min length is 2 charts')
    .max(16, 'max length is 16 charts').matches(/^[a-z ,.'-]+$/i, 'You can use only letters'),
  email: Yup.string().required('Required').email().trim()
    .max(30, 'max length is 30 charts'),
  password: Yup.string().required('Required').trim().min(6, 'min length is 6 charts')
    .max(50, 'max length is 50 charts'),
  repeatPass: Yup.string().required('Required').oneOf([Yup.ref('password')], 'Passwords do not match'),
  role: Yup.string().required(),
});

export const PaymentSchema = Yup.object().shape({
  card: Yup.string().required('Required')
    .matches(/\b\d{4}(| |-)\d{4}\1\d{4}\1\d{4}\b/i, 'Please check the format of number\'s card'),
  expires: Yup.string().required('Required')
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/i, 'Please check the format of expiration date'),
  cvv: Yup.string().required('Required')
    .matches(/^[0-9]{3,4}$/i, 'Please check the format of cvv'),
});

export const EditContestSchema = Yup.object().shape({
  name: Yup.string().trim().max(30, 'max length is 30 charts').required('Required'),
  purpose: Yup.string().trim().max(30, 'max length is 30 charts').required('Required'),
  industry: Yup.array().required('Required'),
  businessDo: Yup.string().trim().max(500, 'max length is 300 charts').required('Required'),
  targetCustomer: Yup.string().trim().max(500, 'max length is 300 charts').required('Required'),
});

export const EditAccountSchema = Yup.object().shape({
  firstName: Yup.string().required('Required').trim().min(2, 'min length is 2 charts')
    .max(16, 'max length is 16 charts').matches(/^[a-z ,.'-]+$/i, 'You can use only english letters'),
  lastName: Yup.string().required('Required').trim().min(2, 'min length is 2 charts')
    .max(16, 'max length is 16 charts').matches(/^[a-z ,.'-]+$/i, 'You can use only letters'),
  email: Yup.string().required('Required').email().trim()
    .max(30, 'max length is 30 charts'),
});

export const checkingDataCreateEntry = (values, contest) => {
  const errors = {};
  if (contest.type !== 'Logo') {
    if (values.suggestion.length > 100 || values.suggestion.length < 3) {
      errors.suggestion = 'Length must be 3-100 charts!';
    }
  }
  return errors;
};

export const CreateContestSchema = Yup.object().shape({
  name: Yup.string().required('Required').trim().max(300, 'max length is 300 charts'),
  purpose: Yup.string().required('Required').trim().max(300, 'max length is 300 charts')
    .min(2, 'min length is 2 charts'),
  industry: Yup.array().required('Required').min(1),
  businessDo: Yup.string().required('Required').trim().max(300, 'max length is 300 charts'),
  targetCustomer: Yup.string().required('Required').trim().max(300, 'max length is 300 charts'),
  style: Yup.array(),
});
