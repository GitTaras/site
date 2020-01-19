import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Tab, TabList, TabPanel, Tabs,
} from 'react-web-tabs';
import Modal from 'react-responsive-modal';
import styles from './MyTab.module.sass';
import 'react-web-tabs/dist/react-web-tabs.css';
import {
  acceptEntry, favoriteStatus, rejectEntry, checkTypeInPackage, startChat, showListChats, showChat
} from '../../actions/actionCreator';
import ConfirmModal from './ConfirmModal';
import { imgUrl } from '../../api/baseURL';

class MyTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      action: '',
      idEntry: '',
      favorite: false,
      srcImg: '',
    };
  }

  confirm = () => {
    const { action, idEntry } = this.state;
    const {
      acceptEntry, contest, rejectEntry,
    } = this.props;

    if (action === 'accept') {
      acceptEntry(idEntry, contest.id);
    } if (action === 'reject') {
      rejectEntry(idEntry, contest.id);
    }
    this.setState({ isShow: false });
  };

  favoriteEntry(entry) {
    const { setFavoriteStatus, contest } = this.props;
    if (contest.isActive === true) {
      setFavoriteStatus(entry.id, contest.id);
    }
  }

  beginChat(recipient) {
    const { user, startChat, showListChats, showChat } = this.props;
    showListChats(false);
    showChat(true);
    startChat(recipient, user.id);
  }

  renderStatus = (entry) => {
    switch (entry.accept) {
      case null:
        return (
          <div className={styles.icons}>
            <i
              className="fa fa-check-circle"
              onClick={() => this.setState({ isShow: true, action: 'accept', idEntry: entry.id, srcImg: '' })}
            />
            <i
              className="fa fa-times-circle"
              onClick={() => {
                this.setState({ isShow: true, action: 'reject', idEntry: entry.id, srcImg: '' });
              }}
            />
          </div>
        );
      case true:
        return <span className={styles.accept}>Accepted</span>;
      case false:
        return <span className={styles.reject}>Rejected</span>;
      default:
    }
  };

  renderSuggestion = (entry) => {
    if (entry.mimeType === 'multipart/form-data') {
      return (
        <img
          src={`${imgUrl}/${entry.user}/${entry.suggestion}`}
          alt="entries"
          className={styles.img}
          key={entry.id}
          onClick={() => this.setState({ isShow: true, srcImg: `${imgUrl}/${entry.user}/${entry.suggestion}` })}
        />
      );
    }
    return (
      <span className={styles.suggestion}>{`Suggestion: ${entry.suggestion}`}</span>
    );
  };

  renderEntries(sort) {
    let { allEntries } = this.props;
    if (sort === 'rejected') {
      allEntries = allEntries.filter(i => i.accept === false);
    }
    if (sort === 'favorite') {
      allEntries = allEntries.filter(i => i.favorite === true);
    }
    if(allEntries.length !== 0){
      return allEntries.map(entry => (
        <div key={entry.id} className={styles.info}>
          <div className={styles.row}>
            <span className={styles.user}>{`User: ${entry.Customer.firstName} ${entry.Customer.lastName}`}</span>
          </div>
          <div className={styles.row}>
            {this.renderSuggestion(entry)}
          </div>
          <div className={styles.row}>
            {this.renderStatus(entry)}
          </div>
          <div className={styles.row}>
            <div className={styles.favorite}>
              <i
                className={`fa fa-comments ${styles.chat}`}
                onClick={() => this.beginChat(entry.user)}
              />
              <i
                className={`fa fa-star ${styles[entry.favorite]}`}
                onClick={() => this.favoriteEntry(entry)}
              />
            </div>
          </div>
        </div>
      ));
    }
  return <span className={styles.notEntries}>You don't have entries yet</span>
  }

  render() {
    const { isShow, srcImg } = this.state;
    return (
      <>
        <Tabs
          defaultTab="all"
          onChange={(tabId) => {
            this.renderEntries(tabId);
          }}>
          <TabList>
            <Tab tabFor="all" className={styles.tab}>All</Tab>
            <Tab tabFor="rejected" className={styles.tab}>Rejected</Tab>
            <Tab tabFor="favorite" className={styles.tab}>Favorite</Tab>
          </TabList>
          <TabPanel tabId="all">
            <div className={styles.container}>
              {this.renderEntries('all')}
            </div>
          </TabPanel>
          <TabPanel tabId="rejected">
            <div className={styles.container}>
              {this.renderEntries('rejected')}
            </div>
          </TabPanel>
          <TabPanel tabId="favorite">
            <div className={styles.container}>
              {this.renderEntries('favorite')}
            </div>
          </TabPanel>
        </Tabs>
        <Modal open={isShow} onClose={() => this.setState({ isShow: false })}  center>
          <ConfirmModal onClose={() => this.setState({ isShow: false })} Confirm={this.confirm} srcImg={srcImg}/>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  allEntries: state.entryReducer.allEntries,
  currentChat: state.chatReducer.currentChat,
  allMessageForChat: state.messageReducer.allMessageForChat,

});

const mapDispatchToProps = dispatch => ({
  acceptEntry: (idEntry, idContest) => dispatch(acceptEntry(idEntry, idContest)),
  rejectEntry: (idEntry, idContest) => dispatch(rejectEntry(idEntry, idContest)),
  checkTypeInPackage: id => dispatch(checkTypeInPackage(id)),
  setFavoriteStatus: (id, idContest) => dispatch(favoriteStatus(id, idContest)),
  startChat: (recipient, sender) => dispatch(startChat(recipient, sender)),
  showListChats: value => dispatch(showListChats(value)),
  showChat: value => dispatch(showChat(value)),
});

MyTab.propTypes = {
  contest: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  allEntries: PropTypes.arrayOf(PropTypes.any).isRequired,
  acceptEntry: PropTypes.func.isRequired,
  setFavoriteStatus: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTab);
