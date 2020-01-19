import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { buyContest } from '../../actions/actionCreator';
import FormPayment from './FormPayment';
import styles from './Payment.module.sass';
import options from '../../constants/constants';
import Chat from '../Chat/Chat';

class Payment extends Component {

  componentDidMount() {
    const { user, history } = this.props;
    if(user.role === 'creative'){
      history.replace('/')
    }
  }

  payContest = (values) => {
    const { pay, match, history } = this.props;
    values.uuidGroup = match.params.uuidGroup;
    pay(values, history);
  };

  render() {
    const { error, openChat } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.wrapperTag}>
          <span className={styles.tag}>Payment for Managed Branding Contest</span>
        </div>
        <div className={styles.wrapperText}>
          <span className={styles.text}>
Your contest will be co-managed by Squadhelp's branding team. This includes creation of a detailed
          project brief, as well as shortlisting of your entries and ongoing communication with the creatives based
          upon Squadhelp's best practices.
          </span>
        </div>
        <div className={styles.paymentBox}>
          <span className={styles.amount}>Payment Amount: $ 100 USD</span>
          <hr className={styles.line} />
          <FormPayment
            {...this.props}
            serverError={error}
            contentSubmit="pay now"
            submitAction={this.payContest}
            sum={options.sum}
          />
        </div>
        <Chat openChat={openChat} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.contestReducer.error,
  openChat: state.chatReducer.openChat,
});

const mapDispatchToProps = dispatch => ({
  pay: (cardData, history) => dispatch(buyContest(cardData, history)),
});

Payment.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  error: PropTypes.string,
  pay: PropTypes.func.isRequired,
};

Payment.defaultProps = {
  error: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
