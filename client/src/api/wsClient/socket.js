import { baseURL } from '../baseURL';
import ChatController from "./ChatController";
import NotificationController from "./NotificationController";

export const chatController = new ChatController();
chatController.connect(baseURL).listen();

export const notificationController = new NotificationController();
notificationController.connect(baseURL).listen();
