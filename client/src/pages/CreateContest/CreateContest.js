import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from '../../components/Question/Question';
import FormCreateContest from './FormCreateContest';
import { createNewContest, currentUser, pushNewData } from '../../actions/actionCreator';
import styles from './CreateContest.module.sass';
import Chat from '../Chat/Chat';

class CreateContest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentType: '',
    };
  }

  componentDidMount() {
    const { getUser, match, user, history } = this.props;
    getUser();
    if(user.role === 'creative'){
      history.replace('/');
    }
    this.setState({ currentType: match.params.type.split(',')[0] });
  }

  onSubmit = (data, selectedFile) => {
    const {
      history, createContest, files, arrayContests, pushNewData, match,
    } = this.props;
    const packageTypes = match.params.type.split(',');

    const index = packageTypes.findIndex(item => item === data.type);
    const type = packageTypes[index + 1];

    pushNewData(data, selectedFile);
    window.scrollTo(0, 0);
    this.setState({ currentType: type });
    if (!type) {
      const formData = new FormData();
      files.map(img => formData.append('files', img));
      formData.append('formData', JSON.stringify(arrayContests));
      return createContest(formData, history);
    }
  };

  render() {
    const { openChat } = this.props;
    const { currentType } = this.state;
    return (
      <div className={styles.container}>
        <FormCreateContest
          {...this.props}
          send={this.onSubmit}
          currentType={currentType}
        />
        <Chat openChat={openChat}/>
        <Question/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.currentUser,
  openChat: state.chatReducer.openChat,
  arrayContests: state.contestReducer.arrayNewContests,
  files: state.contestReducer.files,
  currentType: state.contestReducer.currentType,
});

const mapDispatchToProps = dispatch => ({
  createContest: (contest, history) => dispatch(createNewContest(contest, history)),
  getUser: () => dispatch(currentUser()),
  pushNewData: (contest, file) => dispatch(pushNewData(contest, file)),
});

CreateContest.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  getUser: PropTypes.func.isRequired,
};

CreateContest.defaultProps = {
  user: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateContest);
