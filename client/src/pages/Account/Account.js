import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Chat from '../Chat/Chat';
import style from './Account.module.sass';
import FormPayment from '../Payment/FormPayment';
import Input from "../../components/Input/Input";
import {changeProfilePicture, writeOffMoney} from '../../actions/actionCreator';
import {toastError} from "../../components/Notification/Notification";
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';

const Account = (props) => {
  const {user, openChat, history} = props;
  const [openCardDataInputs, isShow] = useState(false);
  const cashOut = (values) => {
    const {user, writeOffMoney} = props;
    if (user.balance > 0) {
      writeOffMoney(values, user.balance);
    }
  };

  const onChangeFile = (event) => {
    const FileSize = event.target.files[0].size / 1024 / 1024;
    if (FileSize > 6) {
      return toastError('Picture is too large. Please, upload another photo (max 6 MB).');
    }
    const {changeProfilePicture} = props;
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('files', file);
    changeProfilePicture(formData);
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h3 className={style.title}>Your personal data</h3>
        <div className={style.userInfo}>
         <ProfilePicture user={user} size={'large'}/>
          <div className={style.personalData}>
            <div className={`${style.row} ${style.userData}`}>
              First name: {user.firstName}
            </div>
            <div className={`${style.row} ${style.userData}`}>
              Last name: {user.lastName}
            </div>
            <div className={`${style.row} ${style.userData}`}>
              Email: {user.email}
            </div>
            <div className={`${style.row} ${style.userData}`}>
              Role: {user.role}
            </div>
          </div>
          <div className={style.edit} onClick={() => history.push(`/dashboard/account/edit`)}>
            <i className="fa fa-pencil" />
          </div>
        </div>
        <div className={style.wrapperFile}>
          <label className={style.fileContainer}>
            Change photo
            <Input type="file" onChange={onChangeFile} multiple name="file"/>
          </label>
        </div>
        {user.role === 'creative' &&
        <>
          <div className={style.row}>
            <div className={style.balance}>
              <span>{`Balance: $ ${user.balance}`}</span>
              {user.balance !== 0 &&
              <span onClick={() => isShow(!openCardDataInputs)}
                    className={style.cashOut}
              >cash out</span>}
            </div>
          </div>
          {openCardDataInputs &&
          <div className={style.row}>
            <div className={style.cashFrom}>
              <FormPayment {...props}
                           submitAction={cashOut}
                           contentSubmit={'get money'}
                           sum={user.balance}
              />
            </div>
          </div>}
        </>}
        <Chat openChat={openChat}/>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  openChat: state.chatReducer.openChat,
});

const mapDispatchToProps = dispatch => ({
  writeOffMoney: (cardData, sum) => dispatch(writeOffMoney(cardData, sum)),
  changeProfilePicture: formData => dispatch(changeProfilePicture(formData)),
});

Account.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
