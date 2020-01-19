import express from 'express';
import chat from '../../controllers/chatController';

const router = express.Router();

router
  .route('/')
  .get(chat.getAllChats)
  .post(chat.startChat);

router
  .route('/message')
  .post(chat.createMessage)
  .put(chat.changeStatusMessages);

export default router;
