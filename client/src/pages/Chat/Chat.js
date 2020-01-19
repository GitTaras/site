import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import styles from './Chat.module.sass';
import image from '../../constants/images';
import Input from '../../components/Input/Input';
import {
  changeMessageContent,
  createMessage,
  getAllChatsForUser,
  resetCurrentChat,
  showChat,
  showListChats,
  startChat,
} from '../../actions/actionCreator';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';


class Chat extends Component {
  componentDidMount() {
    const { getAllChatsForUser } = this.props;
    getAllChatsForUser();
    if (this.startChatPoint) {
      this.scrollChat();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.startChatPoint) {
      this.scrollChat();
    }
  }

  onChange = (e) => {
    const { changeMessageContent } = this.props;
    changeMessageContent(e.target.value);
  };

  sendMessage = () => {
    const {
      createMessage, currentChat, user, changeMessageContent, messageContent,
    } = this.props;
    if (messageContent.trim() !== '') {
      createMessage({
        chat_id: currentChat._id,
        content: messageContent,
        recipientId: currentChat.recipient.id,
        user: {
          firstName: user.firstName, lastName: user.lastName, photo: user.photo, id: user.id,
        },
      });
    }
    changeMessageContent('');
  };

  showBtn = () => {
    const { showChat } = this.props;
    showChat(null);
  };

  scrollChat = () => {
    this.startChatPoint.scrollIntoView({ behavior: 'auto' });
  };

  openChat = (chat) => {
    const { showListChats, startChat, user } = this.props;
    showListChats(false);
    startChat(chat.recipient.id, user.id);
  };

  showAllChats = () => {
    const { getAllChatsForUser, showListChats, resetCurrentChat } = this.props;
    getAllChatsForUser();
    showListChats(true);
    resetCurrentChat();
  };

  renderStatusMessage = (message) => {
    const { user } = this.props;
    if (message.user_id === user.id) {
      return (
        message.status
          ? <img src={image.doubleTick} alt="double-tick" className={styles.status}/>
          : <img src={image.oneTick} alt="tick" className={styles.status}/>
      );
    }
    if (message.unreadMessage > 0) {
      return (
        <span className={styles.unreadMess}>{message.unreadMessage}</span>
      );
    }
  };

  renderHeader = () => {
    const { showListOfChats, currentChat } = this.props;
    if (showListOfChats) {
      return <span className={styles.title}>ALL CHATS</span>;
    }
    if (currentChat.recipient) {
      return (
        <>
          <img src={image.arrow} alt="back" className={styles.arrowBack} onClick={this.showAllChats}/>
          <ProfilePicture user={currentChat.recipient} size="small"/>
          <span className={styles.nameRecipient}>
            {`${currentChat.recipient.firstName} ${currentChat.recipient.lastName}`}
          </span>
        </>
      );
    }
  };

  renderContent = () => {
    const {
      showListOfChats, allChats, allMessageForChat, user, messageContent,
    } = this.props;
    const groupedByDateMessages = _.groupBy(allMessageForChat, item => moment(item.createdAt).format('YYYY-MM-D'));
    if (showListOfChats) {
      return (
        <div className={styles.mainField}>
          {allChats.map(chat => (
            <div className={styles.chat} key={chat._id} onClick={() => this.openChat(chat)}>
              <ProfilePicture user={chat.recipient} size="chatDialog"/>
              <div className={styles.messageInfo}>
                <span>{`${chat.recipient.firstName} ${chat.recipient.lastName}`}</span>
                <span>{chat.content}</span>
              </div>
              {this.renderStatusMessage(chat)}
              <span className={styles.timeInChat}>{this.messageTime(chat.createdAt)}</span>
            </div>
          ))}
        </div>
      );
    }
    return (
      <>
        <div className={styles.mainField}>
          {Object.values(groupedByDateMessages).map((date, index) => (
            <React.Fragment key={index}>
              <div className={styles.dateChat}>
                <span>{this.chatTime(Object.keys(groupedByDateMessages)[index])}</span>
              </div>
              {date.map((message) => {
                const rightSide = message.user_id === user.id && styles.rightSide;
                return (
                  <div className={`${styles.message} ${rightSide}`} key={message._id}>
                    <span>{message.content}</span>
                    <div className={styles.time}>
                      {this.renderStatusMessage(message)}
                      <span>{moment(message.createdAt).format('LT')}</span>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
          <div ref={(e) => {
            this.startChatPoint = e;
          }}
          />
        </div>
        <div className={styles.sender}>
          <Input
            onChange={this.onChange}
            name="messageContent"
            placeholder="Start writing.."
            value={messageContent}
            onKeyPress={this.handleKeyPress}
          />
          <div onClick={this.sendMessage}>
            <img src={image.send} alt="send" className={styles.sendIcon}/>
          </div>
        </div>
      </>
    );
  };

  messageTime = (time) => {
    const daysGone = moment().diff(time, 'days');
    const monthsGone = moment().diff(time, 'months');
    if (monthsGone >= 1) {
      return moment(time).format('MMM D, YYYY');
    }
    if (daysGone >= 7) {
      return moment(time).format('MMM D');
    }
    if (daysGone >= 1) {
      return moment(time).format('ddd');
    }
    return moment(time).format('LT');
  };

  chatTime = (time) => {
    const monthsGone = moment().diff(time, 'months');
    if (monthsGone > 1) {
      return moment(time).format('MMM D, YYYY');
    }
    return moment(time).format('MMM D');
  };

  countAllUnreadMessages = () => {
    const { allChats, user } = this.props;
    let amount = 0;
    allChats.forEach((chat) => {
      if (chat.user_id !== user.id) {
        amount += chat.unreadMessage;
      }
    });
    if (amount > 0) {
      return <span className={styles.totalAmount}>{amount}</span>;
    }
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  };

  render() {
    const { openChat } = this.props;
    return (
      <div className={`${styles[openChat]} ${styles.container}`}>
        <div className={`${styles.wrapper} ${styles[openChat]}`}>
          <div className={styles.header}>
            {this.renderHeader()}
          </div>
          {this.renderContent()}
        </div>
        {this.countAllUnreadMessages()}
        <div className={styles.mainBtn} onClick={this.showBtn}>
          <img src={image.dots} alt="dots" className={styles.iconDots}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allMessageForChat: state.messageReducer.allMessageForChat,
  newMessages: state.messageReducer.newMessages,
  currentChat: state.chatReducer.currentChat,
  showListOfChats: state.chatReducer.showListChats,
  allChats: state.chatReducer.allChats,
  user: state.authReducer.currentUser,
  messageContent: state.chatReducer.messageContent,
});

const mapDispatchToProps = dispatch => ({
  showChat: value => dispatch(showChat(value)),
  showListChats: value => dispatch(showListChats(value)),
  createMessage: info => dispatch(createMessage(info)),
  getAllChatsForUser: () => dispatch(getAllChatsForUser()),
  startChat: (recipient, sender) => dispatch(startChat(recipient, sender)),
  changeMessageContent: content => dispatch(changeMessageContent(content)),
  resetCurrentChat: () => dispatch(resetCurrentChat()),
});

Chat.propTypes = {
  allMessageForChat: PropTypes.arrayOf(PropTypes.any).isRequired,
  currentChat: PropTypes.objectOf(PropTypes.any).isRequired,
  showListOfChats: PropTypes.bool.isRequired,
  openChat: PropTypes.bool.isRequired,
  allChats: PropTypes.arrayOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  showChat: PropTypes.func.isRequired,
  showListChats: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired,
  getAllChatsForUser: PropTypes.func.isRequired,
  startChat: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
