import { Contests } from '../models';
import _ from 'lodash';
import BadReqError from './errors/BadReqError';
import ApplicationError from './errors/ApplicationError';

module.exports.mainCheckingAccessContest = async (req, res, next) => {
  try {
    const contest = await Contests.findByPk(req.params.id);
    if(!contest.dataValues.isActive || !!_.isNull(contest.isActive)){
      return next(new ApplicationError('You don\'t have access' , 400));
    }
    next();
  } catch (err) {
    return next(new BadReqError());
  }
};

module.exports.checkEditContest = async (req, res, next) => {
  try {
    const contest = await Contests.findByPk(req.params.id);
    if(contest.dataValues.isActive === false){
      return next(new ApplicationError('You don\'t have access' , 400));
    }
    next();
  } catch (err) {
    return next(new BadReqError());
  }
};