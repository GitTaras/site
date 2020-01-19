import { put, call, select } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import { beginChat, allChatsForUser } from '../api/rest/restContoller';
import { readMessageStatus } from './messageSaga';
import { chatController } from '../api/wsClient/socket';

export function* startChat({ recipient, sender }) {
  try {
    const { data } = yield beginChat(recipient, sender);
    yield put({ type: ACTION.SUCCESS_CHAT, currentChat: data.conversation[0] });
    yield put({ type: ACTION.ALL_MESSAGES_FOR_CHAT, allMessageForChat: data.allMessages });

    if (data.unreadMessages.length > 0) {
      yield call(readMessageStatus, {unreadMessages: data.unreadMessages, sender});
      const { chatReducer, authReducer } = yield select();
      chatController.checkCurrentChatInRecipient(data.unreadMessages[0].user_id,
        {
          chat_id: chatReducer.currentChat._id,
          openChat: chatReducer.openChat,
          showListChats: chatReducer.showListChats,
          unreadMessages: data.unreadMessages,
          recipient: authReducer.currentUser.id,
        });
      chatController.updateListAllChats(data.unreadMessages[0].user_id);
    }
  } catch (err) {
    yield put({ type: ACTION.ERROR_CHAT, message: err.response.data });
  }
}

export function* getAllChatsForUser() {
  try {
    const { data } = yield allChatsForUser();
    yield put({ type: ACTION.SUCCESS_ALL_CHATS, allChats: data });
  } catch (err) {
    yield put({ type: ACTION.ERROR_CHAT, message: err.response.data });
  }
}

export function* checkCurrentChatInRecipient({ senderData }) {
  try {
    const { chatReducer, authReducer } = yield select();
    if ((senderData.chat_id === chatReducer.currentChat._id)
      && (senderData.openChat === chatReducer.openChat)
      && (senderData.showListChats === chatReducer.showListChats)
    ) {
      chatController.updateStatusMessages(senderData.unreadMessages,
        authReducer.currentUser.id, senderData.recipient);
      chatController.updateCurrentChat(senderData.recipient, authReducer.currentUser.id);
    }
    chatController.updateListAllChats(authReducer.currentUser.id);

  } catch (err) {
    yield put({ type: ACTION.ERROR_CHAT, error: err.response.data });
  }
}

export function* showChat({value}) {
  try {
    let stateChat;
    const { chatReducer } = yield select();
    if (value) {
      stateChat = value;
    } else {
      stateChat = !chatReducer.openChat;
    }
    yield put({ type: ACTION.DISPLAY_CHAT, stateChat});
  } catch (err) {
    yield put({ type: ACTION.ERROR_CHAT, message: err.response.data });
  }
}