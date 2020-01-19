import {put} from 'redux-saga/effects';

import ACTION from '../actions/actionTypes';
import {changeAccount, changePhoto, createUser, getCurrentUser, login, writeOffCash,} from '../api/rest/restContoller';
import {notificationController} from '../api/wsClient/socket';
import {toastError, toastSuccess} from '../components/Notification/Notification';

function* sign(user, history, method) {
  try {
    const { data } = yield method(user);
    yield put({ type: ACTION.SUCCESS_AUTH, currentUser: data.user });
    localStorage.setItem('jwtToken', data.token);
    notificationController.subscribe(data.user.id);
    history.push('/dashboard');
  } catch (err) {
    toastError('Check your data and try again!');
    yield put({ type: ACTION.ERROR_AUTH, message: err.response.data });
  }
}

export function* auth({ user, history }) {
  yield sign(user, history, login);
}

export function* createNewUser({ user, history }) {
  yield sign(user, history, createUser);
}

export function* currentUser() {
  try {
    const { data } = yield getCurrentUser();
    yield put({ type: ACTION.SUCCESS_AUTH, currentUser: data });
    data && notificationController.subscribe(data.id);
  } catch (err) {
    yield put({ type: ACTION.ERROR_AUTH, message: err });
  }
}

export function* logout({ history, id }) {
  try {
    localStorage.removeItem('jwtToken');
    yield put({ type: ACTION.SUCCESS_AUTH, currentUser: null });
    yield put({ type: ACTION.RESET_CURRENT_CHAT });
    notificationController.unsubscribe(id);
    history.push('/');
  } catch (err) {
    yield put({ type: ACTION.ERROR_AUTH, message: err });
  }
}

export function* writeOffMoney({ cardData, sum }) {
  try {
    const { data } = yield writeOffCash(cardData, sum);
    yield put({ type: ACTION.SUCCESS_AUTH, currentUser: data });
    data && toastSuccess('Successfully!');
  } catch (err) {
    toastError('Oops, error! Sorry, try again');
    yield put({ type: ACTION.ERROR_ENTRY, message: err.response.data });
  }
}

export function* changeProfilePicture({ formData }) {
  try {
    const { data } = yield changePhoto(formData);
    yield put({ type: ACTION.SUCCESS_AUTH, currentUser: data });
    data && toastSuccess('Successfully!');
  } catch (err) {
    toastError('Oops, error! Sorry, try again');
    yield put({ type: ACTION.ERROR_ENTRY, message: err.response.data });
  }
}

export function* editAccount({ dataUser, history }) {
  try {
    const { data } = yield changeAccount(dataUser);
    yield put({ type: ACTION.SUCCESS_AUTH, currentUser: data });
    data && toastSuccess('Successfully!');
    history.push('/dashboard/account');
  } catch (err) {
    toastError('Oops, error! Sorry, try again');
    yield put({ type: ACTION.ERROR_ENTRY, message: err.response.data });
  }
}
