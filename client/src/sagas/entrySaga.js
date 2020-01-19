import {call, put, select} from 'redux-saga/effects';
import _ from 'lodash';
import {notificationController} from '../api/wsClient/socket';
import ACTION from '../actions/actionTypes';
import {toastError, toastSuccess} from '../components/Notification/Notification';
import {
  acceptEntryStatus,
  allEntries,
  createNewEntry,
  rejectEntryStatus,
  setFavoriteStatus,
} from '../api/rest/restContoller';
import {checkTypeInPackage} from './contestSaga';

export function* getEntries({ field, param, contestId }) {
  try {
    const { data } = yield allEntries(field, param, contestId);
    yield put({ type: ACTION.SUCCESS_ALL_ENTRIES, entries: data });
  } catch (err) {
    yield put({ type: ACTION.ERROR_ENTRY, message: err.response.data });
  }
}

export function* acceptEntry({ idEntry, idContest }) {
  try {
    const { data } = yield acceptEntryStatus(idEntry, idContest);
    yield put({ type: ACTION.SUCCESS_ALL_ENTRIES, entries: data.entries });
    yield put({ type: ACTION.SUCCESS_CONTEST, contest: data.contest });
    data && toastSuccess('Successfully!');
    notificationController.notify({ id: data.contest.winner_id, message: `Your entry won! (#${idContest})` });
    yield call(checkTypeInPackage, { id: idContest } );
  } catch (err) {
    yield put({ type: ACTION.ERROR_ENTRY, message: err.response.data });
  }
}

export function* rejectEntry({ idEntry, idContest }) {
  try {
    const { data } = yield rejectEntryStatus(idEntry, idContest);
    const allEntries = yield updateEntry(data);
    yield put({ type: ACTION.SUCCESS_UPDATED_ENTRY, allEntries });
    data && toastSuccess('Successfully!');
  } catch (err) {
    yield put({ type: ACTION.ERROR_ENTRY, message: err.response.data });
  }
}

export function* favoriteStatus({ id, idContest }) {
  try {
    const { data } = yield setFavoriteStatus(id, idContest);
    const allEntries = yield updateEntry(data);
    yield put({ type: ACTION.SUCCESS_UPDATED_ENTRY, allEntries });
    data && toastSuccess('Successfully!');
  } catch (err) {
    yield put({ type: ACTION.ERROR_ENTRY, message: err.response.data });
  }
}

export function* createEntry({
  entryData, idContest, history, ownerContestId,
}) {
  try {
    const { data } = yield createNewEntry(entryData, idContest);
    yield put({ type: ACTION.SUCCESS_ALL_ENTRIES, entries: data });
    notificationController.notify({ id: ownerContestId, message: `You have a new entry! (#${idContest})` });
    history.replace('/dashboard/active');
  } catch (err) {
    toastError('Oops.. Error!');
    yield put({ type: ACTION.ERROR_ENTRY, message: err.response.data });
  }
}

function* updateEntry(entry) {
  try {
    const { entryReducer } = yield select();
    const allEntries = _.cloneDeep(entryReducer.allEntries);
    const index = entryReducer.allEntries.findIndex(e => e.id === entry.id);
    allEntries[index] = { ...allEntries[index], ...entry };
    return allEntries;
  } catch (err) {
    return err;
  }
}
