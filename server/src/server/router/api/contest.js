import express from 'express';
import contests from '../../controllers/contestController';
import {yupValidationEditContest, yupValidationPayment} from '../../utils/yupValidation';
import {roleBuyer, roleCreative} from '../../utils/checkRole';
import {checkEditContest} from '../../utils/checkAccessContest';

const router = express.Router();

router
  .route('/')
  .post(roleBuyer, contests.createContest)
  .get(roleCreative, contests.getAllActiveContests);

router
  .route('/selection')
  .get(roleBuyer, contests.getContestsForUser);

router
  .route('/payment')
  .post(roleBuyer, yupValidationPayment, contests.payContest);

router
  .route('/draft')
  .get(roleBuyer, contests.getDraftContests);

router
  .route('/filter')
  .get(roleCreative, contests.filterActiveContests);

router
  .route('/favorite/:id')
  .get(roleCreative, contests.getFavoriteContests)
  .put(roleCreative, contests.toggleFavoriteContest);

router
  .route('/:id')
  .put(roleBuyer, yupValidationEditContest, checkEditContest, contests.editContest)
  .post(roleBuyer, contests.checkTypeInPackage)
  .get(contests.getFullContestById);
router
  .route('/:id/img')
  .put(roleBuyer, checkEditContest, contests.changeContestPicture);

export default router;
