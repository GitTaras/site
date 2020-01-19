import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editContest, changeContestPicture } from '../../actions/actionCreator';
import FormEditContest from './FormEditContest';

class EditContest extends Component {
  componentDidMount() {
    const { history, match, user } = this.props;
    if(user.role === 'creative'){
      history.replace(`/contest/${match.params.id}`);
    }
  }

  save = (body) => {
    const { save, history, match } = this.props;
    save(match.params.id, body);
    history.replace(`/contest/${match.params.id}`);
  };

  render() {
    return (
      <FormEditContest {...this.props} save={this.save} />
    );
  }
}

const mapStateToProps = state => ({
  allEntries: state.entryReducer.allEntries,
});

const mapDispatchToProps = dispatch => ({
  save: (id, body) => dispatch(editContest(id, body)),
  changeContestPicture: (formData, id, history) => dispatch(changeContestPicture(formData, id, history)),
});

EditContest.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  save: PropTypes.func.isRequired,
  allEntries: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditContest);
