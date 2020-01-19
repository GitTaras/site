import { put, select, call } from 'redux-saga/effects';
import _ from 'lodash';
import ACTION from '../actions/actionTypes';
import { changeStatusMessages, createMessage } from '../api/rest/restContoller';
import { chatController } from '../api/wsClient/socket';

export function* someMessages({ message }) {
  try {
    const { messageReducer } = yield select();
    const allMessage = _.cloneDeep(messageReducer.allMessageForChat);
    if ((messageReducer.allMessageForChat.length === 0)
      || (message.chat_id === messageReducer.allMessageForChat[0].chat_id)) {
      allMessage.push(message);
    }
    yield put({ type: ACTION.ALL_MESSAGES_FOR_CHAT, allMessageForChat: allMessage });
  } catch (err) {
    yield put({ type: ACTION.ERROR_MESSAGE, error: err.response.data });
  }
}

export function* readMessageStatus({ unreadMessages, sender }) {
  try {
    const { messageReducer } = yield select();
    const allMessages = messageReducer.allMessageForChat;
    const { data } = yield changeStatusMessages(unreadMessages);
    data.forEach((mess) => {
      const index = messageReducer.allMessageForChat.findIndex(e => e._id === mess._id);
      allMessages[index] = mess;
    });
    yield put({ type: ACTION.ALL_MESSAGES_FOR_CHAT, allMessageForChat: allMessages });
    chatController.updateListAllChats(sender);
  } catch (err) {
    yield put({ type: ACTION.ERROR_MESSAGE, error: err.response.data });
  }
}

export function* sendMessage({ info }) {
  const {
    chat_id, content, recipientId, user,
  } = info;
  try {
    const { data } = yield createMessage(chat_id, content);
    yield call(someMessages, { message: data });
    chatController.sendMessage({ id: recipientId, message: data, user });
    const { chatReducer } = yield select();
    chatController.checkCurrentChatInRecipient(recipientId,
      {
        chat_id,
        openChat: chatReducer.openChat,
        showListChats: chatReducer.showListChats,
        unreadMessages: [data],
        recipient: user.id,
      });
  } catch (err) {
    yield put({ type: ACTION.ERROR_MESSAGE, error: err.response.data });
  }
}
