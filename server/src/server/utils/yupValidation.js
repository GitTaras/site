import { signup, signin, contest, editContest, createEntry, payment } from './yupPlan';
import BadReqError from './errors/BadReqError';

module.exports.yupValidationSignUp = async (req, res, next) => {
  try {
    await signup.validate(req.body);
    next();
  } catch (err) {
    next(new BadReqError(err.errors));
  }
};

module.exports.yupValidationSignIn = async (req, res, next) => {
  try {
    await signin.validate(req.body);
    next();
  } catch (err) {
    next(new BadReqError(err.errors));
  }
};

module.exports.yupValidationEditContest = async (req, res, next) => {
  try {
    await editContest.validate(req.body);
    next();
  } catch (err) {
    next(new BadReqError(err.errors));
  }
};

module.exports.yupValidationCreateEntry = async (req, res, next) => {
  try {
    await createEntry.validate(req.body);
    next();
  } catch (err) {
    next(new BadReqError(err.errors));
  }
};

module.exports.yupValidationPayment = async (req, res, next) => {
  try {
    await payment.validate(req.body);
    next();
  } catch (err) {
    next(new BadReqError(err.errors));
  }
};
