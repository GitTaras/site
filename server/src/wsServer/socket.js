import socketio from 'socket.io';

let io;

module.exports.listen = httpServer => {

  io = socketio.listen(httpServer);

  io.sockets.on('connect', (socket) => {
    socket.on('disconnect', () => {});

    socket.on('notify', (data) => {
      socket.to(data.id).emit('notification', data.message);
    });

    socket.on('sendMessage', (data) => {
      socket.to(data.id).emit('addMessage', data.message, data.user);
    });
    socket.on('updateCurrentChat', (recipient, sender) => {
      socket.to(recipient).emit('updateChat', recipient, sender);
    });
    socket.on('updateListAllChats', (id) => {
      socket.to(id).emit('allChats');
    });
    socket.on('updateStatusMessages', (messages, recipient, sender) => {

      socket.to(recipient).emit('readMessageStatus', messages, sender);
    });
    socket.on('checkCurrentRecipientChat', (id, data) => {
      socket.to(id).emit('checkCurrentChatInRecipient', data);
    });

    socket.on('subscribe', (id) => {
      socket.join(id);
    });
    socket.on('unsubscribe', (id) => {
      socket.leave(id);
      socket.to(id).emit('disconnect');
    });
  });
};
