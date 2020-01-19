import jwt from 'jsonwebtoken';
import { KEY_TOKEN } from './constants';
import { Customers } from '../models';
import ApplicationError from './errors/ApplicationError';

module.exports = async (req, res, next) => {
  try {
    if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, KEY_TOKEN);

    const user = await Customers.findByPk(decoded.id);
    req.id = user.id;
    req.role = user.role;
      return next();
    } else {
      return res.end();
    }
  } catch (err) {
    return next(new ApplicationError('Unauthorized ', 401));
  }
};
