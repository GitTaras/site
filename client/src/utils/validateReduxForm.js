import { SigninSchema } from './validationForm';

export const asyncValidate = values => new Promise((resolve, reject) => {
  SigninSchema.validate(values, { abortEarly: false })
    .then(() => {
      resolve();
    })
    .catch((errors) => {
      const rErrors = {};

      errors.inner.forEach((error) => {
        rErrors[error.path] = error.message;
      });
      reject(rErrors);
    });
});
