import * as yup from 'yup';

module.exports.signup = yup.object().shape({
  firstName: yup.string().required().trim().min(2, 'min length is 2 charts').max(16, 'max length is 16 charts'),
  lastName: yup.string().required().trim().min(2, 'min length is 2 charts').max(16, 'max length is 16 charts'),
  email: yup.string().required().email().trim().max(30, 'max length is 30 charts'),
  password: yup.string().required().trim().min(6, 'min length is 6 charts').max(50, 'max length is 50 charts'),
  role: yup.string().required()
});

module.exports.signin = yup.object().shape({
  email: yup.string().required().email().trim().max(30, 'max length is 30 charts').min(6, 'min length is 6 charts'),
  password: yup.string().required().trim().min(6, 'min length is 6 charts').max(50, 'max length is 50 charts')
});

module.exports.editContest = yup.object().shape({
  name: yup.string().trim().max(30, 'max length is 30 charts').required('Required'),
  purpose: yup.string().trim().max(30, 'max length is 30 charts').required('Required'),
  industry: yup.array().required('Required'),
  businessDo: yup.string().trim().max(500, 'max length is 300 charts').required('Required'),
});

module.exports.payment = yup.object().shape({
  card: yup.string().required('Required')
    .matches(/\b\d{4}(| |-)\d{4}\1\d{4}\1\d{4}\b/i, 'Please check the format of number\'s card'),
  expires: yup.string().required('Required')
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/i, 'Please check the format of expiration date'),
  cvv: yup.string().required('Required')
    .matches(/^[0-9]{3,4}$/i, 'Please check the format of cvv'),
});

module.exports.createEntry = yup.object().shape({
  suggestion: yup.string().trim().max(300, 'max length is 300 charts')
    .min(3,'min length is 3 charts').required('Required'),
});
