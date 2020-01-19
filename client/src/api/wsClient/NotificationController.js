import WSController from './WSController';

class NotificationController extends WSController {

  notify(data) {
    this.socket.emit('notify', data);
  }
}

export default NotificationController;
