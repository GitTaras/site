import WSController from './WSController';

class ChatController extends WSController {
  sendMessage(data) {
    this.socket.emit('sendMessage', data);
  }

  updateCurrentChat(recipient, sender) {
    this.socket.emit('updateCurrentChat', recipient, sender);
  }

  updateStatusMessages(messages, recipient, sender) {
    this.socket.emit('updateStatusMessages', messages, recipient, sender);
  }

  checkCurrentChatInRecipient(id, data) {
    this.socket.emit('checkCurrentRecipientChat', id, data);
  }

  updateListAllChats(id) {
    this.socket.emit('updateListAllChats', id);
  }
}

export default ChatController;
