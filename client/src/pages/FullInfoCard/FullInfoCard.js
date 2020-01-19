import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './FullInfoCard.module.sass';
import {imgUrl} from '../../api/baseURL';
import BriefEntry from '../../components/BriefEntry/BriefEntry';
import { editContest, getContestById, getEntries, getLikedContests, showChat, showListChats,
  startChat, toggleFavoriteContest } from '../../actions/actionCreator';
import InfoByContest from "./InfoByContest";

class FullInfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      srcImg: '',
      isShow: false,
    };
  }

  componentDidMount() {
    const { getAllEntries, user, match, getLikedContests, getCurrentContest } = this.props;
    if (user.role === 'creative') {
      getAllEntries('user', user.id, match.params.id);
      getLikedContests(user.id);
      this.likeByContest();
    }
    if (user.role === 'buyer') {
      getAllEntries('contest', match.params.id);
    }
    getCurrentContest(match.params.id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props !== prevProps) {
      this.likeByContest();
    }
  }

  setImgInfo = (isShow, srcImg) => {
    this.setState({isShow, srcImg});
  };

  entriesForCreative = () => {
    const { allEntries, user } = this.props;
    const sortedEntries = [];
    for (const i in allEntries) {
      if (allEntries[i].mimeType === 'multipart/form-data') {
        sortedEntries.push(
          <img
            src={`${imgUrl}/${user.id}/${allEntries[i].suggestion}`}
            alt="entries"
            className={styles.img}
            key={allEntries[i].id}
            onClick={() => this.setImgInfo(true, `${imgUrl}/${user.id}/${allEntries[i].suggestion}`)}
          />,
        );
      } else {
        sortedEntries.push(
          <BriefEntry
            key={allEntries[i].id}
            suggestion={allEntries[i].suggestion}
          />,
        );
      }
    }
    return sortedEntries;
  };

  writeInChat = () => {
    const {
      startChat, contest, user, showListChats, showChat,
    } = this.props;
    showListChats(false);
    showChat(true);
    startChat(contest.owner_id, user.id);
  };

  renderListStyles = (list) => {
    return <div className={styles.row}>
      <span className={styles.title}>Preferences for style</span>
      {list.map(item => (
        <span key={item} className={styles.description}>{`${item},`}</span>
      ))}
    </div>;
  };

  likeByContest = () => {
    const { favoriteContests, contest, toggleFavoriteContest, user } = this.props;
    let favorite = favoriteContests.find(item => item.id === contest.id);
    return (
      <div className={styles.like}>
        <i
          className={`fa fa-heart ${styles[!!favorite]}`}
          onClick={() => toggleFavoriteContest(contest.id, user.id)}
        />
        <i
          className={`fa fa-comments ${styles.chat}`}
          onClick={this.writeInChat}
        />
      </div>
    );
  };

  payNow = (uuidGroup) => {
    const { history } = this.props;
    return (
      <div className={styles.row}>
        <span className={`${styles.title} ${styles.payNow}`}
              onClick={() => history.push(`/contest/payment/${uuidGroup}`)}>
          pay now
        </span>
      </div>);
  };

  renderEdit = (id) => {
    const { history } = this.props;
    return (
      <div className={styles.edit}>
        <span className={styles.title}
              onClick={() => history.push(`/contest/edit/${id}`)}>edit</span>
      </div>);
  };

  render() {
    const {isShow, srcImg} = this.state;

    return (
      <InfoByContest {...this.props}
                     isShow={isShow}
                     srcImg={srcImg}
                     setImgInfo={this.setImgInfo}
                     entriesForCreative={this.entriesForCreative}
                     payNow={this.payNow}
                     renderEdit={this.renderEdit}
                     renderListStyles={this.renderListStyles}
                     likeByContest={this.likeByContest}
      />
    )
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.currentUser,
  allEntries: state.entryReducer.allEntries,
  favoriteContests: state.contestReducer.favoriteContests,
  openChat: state.chatReducer.openChat,
});


const mapDispatchToProps = dispatch => ({
  getAllEntries: (field, param, contestId) => dispatch(getEntries(field, param, contestId)),
  toggleFavoriteContest: (idContest, userId) => dispatch(toggleFavoriteContest(idContest, userId)),
  getLikedContests: idContest => dispatch(getLikedContests(idContest)),
  save: (id, body) => dispatch(editContest(id, body)),
  getCurrentContest: id => dispatch(getContestById(id)),
  startChat: (recipient, sender) => dispatch(startChat(recipient, sender)),
  showListChats: value => dispatch(showListChats(value)),
  showChat: value => dispatch(showChat(value)),
});

FullInfoCard.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  contest: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  openChat: PropTypes.bool.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(FullInfoCard);
