import express from 'express';
import entry from '../../controllers/entryController';
import {roleBuyer, roleCreative} from '../../utils/checkRole';
import { mainCheckingAccessContest } from '../../utils/checkAccessContest';

const router = express.Router();

router
  .route('/')
  .post(entry.getEntriesByCondition)
  .put(roleCreative, entry.cashOut);

router
  .route('/create/:id')
  .post(roleCreative, mainCheckingAccessContest, entry.createEntry);

router
  .route('/accept/:id')
  .put(roleBuyer, mainCheckingAccessContest, entry.setAcceptStatus);

router
  .route('/reject/:id')
  .put(roleBuyer, mainCheckingAccessContest, entry.setRejectStatus);

router
  .route('/favorite/:id')
  .put(roleBuyer, mainCheckingAccessContest, entry.toggleFavoriteEntry);

export default router;
