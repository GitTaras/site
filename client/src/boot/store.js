import React, { Component } from 'react';
import { Provider } from 'react-redux';
import config from './config';
import App from '../App';
import {chatController, notificationController} from '../api/wsClient/socket';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: notificationController.initSocket(chatController.initSocket(config())),
    };
  }

  render() {
    const { store } = this.state;
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Store;
