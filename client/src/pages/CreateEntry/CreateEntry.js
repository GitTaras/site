import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import styles from './CreateEntry.module.sass';
import FormCreateEntry from './FormCreateEntry';
import { getContestById, createEntry } from '../../actions/actionCreator';

const CreateEntry = (props) => {
  useEffect(() => {
    const {match, user, getCurrentContest, contest, history} = props;
    if(!contest){
      getCurrentContest(match.params.id);
    }
    if(user.role === 'buyer'){
      history.replace(`/contest/${match.params.id}`);
    }
  });

  return(
    <div className={styles.container}>
      <FormCreateEntry {...props}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contest: state.contestReducer.contest,
  error: state.entryReducer.error,
});

const mapDispatchToProps = dispatch => ({
  getCurrentContest: id => dispatch(getContestById(id)),
  createEntry: (entryData, idContest, history, ownerContestId) => dispatch(createEntry(entryData, idContest, history, ownerContestId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEntry);
