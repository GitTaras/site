import io from 'socket.io-client';
import {
  addMessage,
  checkCurrentChatInRecipient,
  getAllChatsForUser,
  readMessageStatus,
  startChat,
} from '../../actions/actionCreator';
import {infoToast, notificationNewMessage} from '../../components/Notification/Notification';

class WSController {
  connect(baseURL) {
    this.socket = io(baseURL, { origins: 'localhost:*' });
    return this;
  }

  initSocket(store) {
    this.dispatch = store.dispatch;
    return store;
  }

  listen() {
    this.socket.on('connect', () => {
    });
    this.socket.on('disconnect', () => {
      this.socket.disconnect(true);
    });

    this.socket.on('notification', (data) => {
      infoToast(data);
    });

    this.socket.on('addMessage', (message, user) => {
      notificationNewMessage(message, user);
      this.dispatch(addMessage(message));
      this.dispatch(getAllChatsForUser());
    });
    this.socket.on('updateChat', (recipient, sender) => {
      this.dispatch(startChat(recipient, sender));
    });
    this.socket.on('allChats', () => {
      this.dispatch(getAllChatsForUser());
    });
    this.socket.on('readMessageStatus', (messages, sender) => {
      this.dispatch(readMessageStatus(messages, sender));
    });
    this.socket.on('checkCurrentChatInRecipient', (data) => {
      this.dispatch(checkCurrentChatInRecipient(data));
    });
  }

  subscribe(id) {
    this.socket.emit('subscribe', id);
  }

  unsubscribe(id) {
    this.socket.emit('unsubscribe', id);
  }
}

export default WSController;
