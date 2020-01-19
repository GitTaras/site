import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import styles from './Dashboard.module.sass';
import BriefCard from '../../components/BriefCard/BriefCard';
import Button from '../../components/Button/Button';
import {getEntries, getActiveContests, getLikedContests, getDraftContests} from '../../actions/actionCreator';
import BriefEntry from '../../components/BriefEntry/BriefEntry';
import {imgUrl} from '../../api/baseURL';
import Filter from '../../components/Filter/Filter';
import Chat from '../Chat/Chat';

class Dashboard extends Component {

  componentDidMount() {
    const {
      getAllContests, getActiveContests, user, getAllEntries, getLikedContests, getDraftContests
    } = this.props;
    if (user.role === 'buyer') {
      getAllContests();
      getDraftContests();
    }
    if (user.role === 'creative') {
      getActiveContests();
      getAllEntries('user', user.id);
      getLikedContests(user.id);
    }
  }

  addContest = () => {
    const {history} = this.props;
    history.push('/contest');
  };

  viewContest = (id) => {
    const {history} = this.props;
    history.push(`/contest/${id}`);
  };

  renderUsersEntries = () => {
    const {allEntries, history, user} = this.props;
    if (allEntries.length === 0) {
      return <span className={styles.deficitEntries}>You don't have an entries yet</span>;
    }
    return (
      <div className={styles.cardContainer}>
        {allEntries.map((entry) => {
          if (entry.mimeType === 'multipart/form-data') {
            return (
              <div
                className={styles.suggestion}
                key={entry.id}
                onClick={() => history.push(`/contest/${entry.contest}`)}
              >
                <div className={styles.suggestionImg}>
                  <img
                    src={`${imgUrl}/${user.id}/${entry.suggestion}`}
                    alt="entries"
                    className={styles.img}
                  />
                </div>
              </div>
            );
          }
          return (
            <div
              className={styles.suggestion}
              key={entry.id}
              onClick={() => history.push(`/contest/${entry.contest}`)}
            >
              <BriefEntry
                key={entry.id}
                suggestion={entry.suggestion}
              />
            </div>
          );
        })}
      </div>
    );
  };

  renderFavoriteContests = () => {
    const {favoriteContests} = this.props;
    if (favoriteContests.length === 0) {
      return <span className={styles.message}>You don't have such contest yet</span>;
    }
    return favoriteContests.map(contest => (
      <div className={styles.briefCardContainer} key={contest.id}>
        <BriefCard
          {...contest}
          onClick={this.viewContest}
        />
      </div>
    ));
  };

  renderPackages = (contests) => {
    const setContests = _.groupBy(contests, 'uuidGroup');
    return Object.values(setContests).map((packageContest, index) => (
      <div className={styles.briefCardContainer} key={index}>
        {packageContest.map(contest => (
          <BriefCard
            key={contest.id}
            {...contest}
            onClick={this.viewContest}
          />
        ))}
      </div>
    ));
  };

  renderContests = () => {
    const {allContests, location, draftContests} = this.props;
    const path = location.pathname.split('/')[2];
    let type = true;
    if (path === 'inactive') {
      type = false;
    }
    switch (path) {
      case 'entries': {
        return this.renderUsersEntries();
      }
      case 'favorite': {
        return this.renderFavoriteContests();
      }
      case 'packageGroup': {
        let contests = allContests.filter(item => item.isPayed === true);
        return this.renderPackages(contests);
      }
      case 'draft': {
        if (draftContests.length === 0) {
          return <span className={styles.message}>All contests is paid</span>;
        }
        return this.renderPackages(draftContests);
      }
      default: {
        let contests = allContests.filter(item => item.isActive === type);
        if (contests.length === 0) {
          return <span className={styles.message}>You don't have such contest yet</span>;
        }
        return contests.map(contest => (
          <div className={styles.briefCardContainer} key={contest.id}>
            <BriefCard
              {...contest}
              onClick={this.viewContest}
            />
          </div>
        ))
      }
    }
  };

  render() {
    const {user, location, openChat} = this.props;
    const path = location.pathname.split('/')[2];
    return (
      <div className={styles.container}>
        <div className={styles.briefWrapper}>
          {user.role === 'buyer'
          && <Button content="+ Add contest" btnStyle="addContest" onClick={this.addContest}/>}
          {(user.role === 'creative' && path === 'active')
          && <Filter/>}
          {this.renderContests()}
           <div className={styles.navigationUp} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <i className="fa fa-chevron-up"/>
          </div>
          <Chat openChat={openChat}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.currentUser,
  allContests: state.contestReducer.allContests,
  favoriteContests: state.contestReducer.favoriteContests,
  allEntries: state.entryReducer.allEntries,
  openChat: state.chatReducer.openChat,
  draftContests: state.contestReducer.draftContests,
});

const mapDispatchToProps = dispatch => ({
  getActiveContests: () => dispatch(getActiveContests()),
  getLikedContests: idContest => dispatch(getLikedContests(idContest)),
  getAllEntries: (field, param, contestId) => dispatch(getEntries(field, param, contestId)),
  getDraftContests: () => dispatch(getDraftContests()),
});

Dashboard
  .propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  getAllContests: PropTypes.func.isRequired,
  allContests: PropTypes.arrayOf(PropTypes.any),
  openChat: PropTypes.bool.isRequired,

};

Dashboard
  .defaultProps = {
  allContests: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
