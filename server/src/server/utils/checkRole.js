import {roles} from './constants';
import ForbiddenError from './errors/ForbiddenError';

module.exports.roleBuyer = (req, res, next) => {
  if (req.role === roles.buyer) {
    return next();
  }
  return next(new ForbiddenError());
};

module.exports.roleCreative = (req, res, next) => {
  if (req.role === roles.creative) {
    return next();
  }
  return next(new ForbiddenError());
};
