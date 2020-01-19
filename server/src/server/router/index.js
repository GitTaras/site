import express from 'express';
import auth from './api/auth';
import contest from './api/contest';
import chat from './api/chat';
import entry from './api/entry';
import checkToken from '../utils/checkToken';

const router = express.Router();

router.use('/auth', auth);
router.use('/contest', checkToken, contest);
router.use('/entry', checkToken, entry);
router.use('/chat', checkToken, chat);

export default router;
