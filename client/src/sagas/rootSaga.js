import { takeLatest } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {
  auth, createNewUser, currentUser, logout, writeOffMoney, changeProfilePicture, editAccount
} from './authSaga';
import {
  createNewContest, buyContest, getContests, getContestById, editContest, checkTypeInPackage,
  getActiveContests, setFilter, toggleFavoriteContest, getLikedContests, changeContestPicture,
  getDraftContests, pushNewData
} from './contestSaga';
import {
  getEntries, acceptEntry, rejectEntry, favoriteStatus, createEntry,
} from './entrySaga';
import { startChat, getAllChatsForUser, checkCurrentChatInRecipient, showChat } from './chatSaga';
import { sendMessage, readMessageStatus, someMessages } from './messageSaga';

function* rootSaga() {
  // AUTHORISATION
  yield takeLatest(ACTION.AUTH, auth);
  yield takeLatest(ACTION.LOGOUT, logout);
  yield takeLatest(ACTION.GET_CURRENT_USER, currentUser);
  yield takeLatest(ACTION.CREATE_USER, createNewUser);
  yield takeLatest(ACTION.CHANGE_USER_PHOTO, changeProfilePicture);
  yield takeLatest(ACTION.CHANGE_USER_INFO, editAccount);

  // CONTESTS
  yield takeLatest(ACTION.CREATE_CONTEST, createNewContest);
  yield takeLatest(ACTION.PAYMENT, buyContest);
  yield takeLatest(ACTION.GET_CONTESTS, getContests);
  yield takeLatest(ACTION.EDIT_CONTEST, editContest);
  yield takeLatest(ACTION.GET_CONTEST_BY_ID, getContestById);
  yield takeLatest(ACTION.FAVORITE_STATUS_CONTEST, toggleFavoriteContest);
  yield takeLatest(ACTION.ALL_FAVORITE_CONTESTS, getLikedContests);
  yield takeLatest(ACTION.PACKAGE_INFO, checkTypeInPackage);
  yield takeLatest(ACTION.GET_ACTIVE_CONTESTS, getActiveContests);
  yield takeLatest(ACTION.FILTER_CONTEST, setFilter);
  yield takeLatest(ACTION.CASH_OUT, writeOffMoney);
  yield takeLatest(ACTION.CHANGE_CONTEST_PHOTO, changeContestPicture);
  yield takeLatest(ACTION.GET_DRAFT_CONTESTS, getDraftContests);
  yield takeLatest(ACTION.PUSH_NEW_CONTEST, pushNewData);

  // ENTRIES
  yield takeLatest(ACTION.GET_ENTRIES, getEntries);
  yield takeLatest(ACTION.CREATE_ENTRIES, createEntry);
  yield takeLatest(ACTION.ACCEPT_ENTRY, acceptEntry);
  yield takeLatest(ACTION.REJECT_ENTRY, rejectEntry);
  yield takeLatest(ACTION.FAVORITE_STATUS_ENTRY, favoriteStatus);

  // CHATS
  yield takeLatest(ACTION.START_CHAT, startChat);
  yield takeLatest(ACTION.SHOW_CHAT, showChat);
  yield takeLatest(ACTION.ALL_CHATS_FOR_USER, getAllChatsForUser);
  yield takeLatest(ACTION.CHECK_CURRENT_CHAT_IN_RECIPIENT, checkCurrentChatInRecipient);

  // MESSAGES
  yield takeLatest(ACTION.SEND_MESSAGE, sendMessage);
  yield takeLatest(ACTION.SUCCESS_SOME_MESSAGES, someMessages);
  yield takeLatest(ACTION.READ_MESSAGE_STATUS, readMessageStatus);
}

export default rootSaga;
