import {Customers} from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {KEY_TOKEN, expiresToken, pathImg} from '../utils/constants';
import NotFound from '../utils/errors/NotFound';
import {convertingData, deletePhotoFromServer} from './helperController';
import BadReqError from '../utils/errors/BadReqError';

module.exports.createUser = async (req, res, next) => {
  try {
    let {password} = req.body;
    req.body.password = await bcrypt.hash(password, await bcrypt.genSalt(8));
    const newUser = await Customers.create(req.body);
    const token = await jwt.sign({id: newUser.id}, KEY_TOKEN, {expiresIn: expiresToken});
    delete newUser.dataValues.password;
    res.send({token, user: newUser});
  } catch (err) {
    next(new BadReqError());
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await Customers.findOne({where: {email}, raw: true});
    const isSamePasswords = await bcrypt.compare(password, user.password);
    if (!isSamePasswords) {
      return next(new BadReqError());
    }
    const newToken = await jwt.sign({id: user.id}, KEY_TOKEN, {expiresIn: expiresToken});
    delete user.password;
    res.send({token: newToken, user});
  } catch (err) {
    next(new NotFound())
  }
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await Customers.findOne(
      {
        where: {id: req.id},
        attributes: {exclude: ['password']},
      }
    );
    if (!user) {
      return next(new NotFound())
    }
    res.send(user);
  } catch (err) {
    next(err)
  }
};

module.exports.changeProfilePicture = async (req, res, next) => {
  try {
    const photo = await convertingData(req, res, next);
    const oldData = await Customers.findByPk(req.id);
    await deletePhotoFromServer(oldData.photo, req.id);
    const [, [user]] = await Customers.update(
      {photo},
      {
        where: {id: req.id},
        returning: true
      });
    res.send(user);
  } catch (err) {
    next(new BadReqError());
  }
};

module.exports.editUser = async (req, res, next) => {
  try {
    const [, [user]] = await Customers.update(
      req.body,
      {
        where: {id: req.id},
        returning: true
      });
    res.send(user);
  } catch (err) {
    next(new BadReqError());
  }
};
