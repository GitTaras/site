import { put, select } from 'redux-saga/effects';
import _ from 'lodash';
import { toastSuccess, toastError } from '../components/Notification/Notification';
import ACTION from '../actions/actionTypes';
import {
  createContest, payContest, allContests, findContest, changeContest,
  allActiveContests, setFilterContest, favoriteContestToggle, getLikedContestsForUser,
  checkTypeContest, changePictureContests, draftContests,
} from '../api/rest/restContoller';

export function* someContest(contests) {
  try {
    const { contestReducer } = yield select();
    const newContests = contestReducer.allContests;
    const index = contestReducer.allContests.findIndex(e => e.id === contests.id);
    if (index === -1) {
      newContests.push(contests);
    } else {
      newContests.splice(index, 1, contests);
    }
    return newContests;
  } catch (err) {
    return err;
  }
}

export function* createNewContest({ contest, history }) {
  try {
    const { data } = yield createContest(contest);
    const contests = yield someContest(data);
    yield put({ type: ACTION.SUCCESS_ALL_CONTESTS, contests });
    toastSuccess('Save in draft');
    history.push(`/contest/payment/${data[0].uuidGroup}`);
  } catch (err) {
    toastError(err.response.data.message);
    yield put({ type: ACTION.ERROR_CONTEST, message: err.response.data });
  }
}

export function* buyContest({ cardData, history }) {
  try {
    yield payContest(cardData);
    toastSuccess('Successfully!');
    history.replace('/dashboard/active');
  } catch (err) {
    toastError('Oops, error! Sorry, try again');
    yield put({ type: ACTION.ERROR_CONTEST, message: err.response.data });
  }
}

export function* getContestById({ id }) {
  try {
    const { data } = yield findContest(id);
    yield put({ type: ACTION.SUCCESS_CONTEST, contest: data });
  } catch (err) {
    yield put({ type: ACTION.ERROR_CONTEST, message: err.response.data });
  }
}

export function* getContests() {
  try {
    const { data } = yield allContests();
    yield put({ type: ACTION.SUCCESS_ALL_CONTESTS, contests: data });
  } catch (err) {
    yield put({ type: ACTION.ERROR_CONTEST, message: err.response.data });
  }
}

export function* editContest({ id, body }) {
  try {
    const { data } = yield changeContest(id, body);
    yield put({ type: ACTION.SUCCESS_CONTEST, contest: data });
    data && toastSuccess('Contest successfully changed!');
  } catch (err) {
    toastError('You can\'t edit this contest!');
    yield put({ type: ACTION.ERROR_CONTEST, message: err.response.data });
  }
}
export function* getLikedContests({ idContest }) {
  try {
    const { data } = yield getLikedContestsForUser(idContest);
    yield put({ type: ACTION.FAVORITE_CONTESTS_FOR_USER, contests: data });
  } catch (err) {
    yield put({ type: ACTION.ERROR_CONTEST, message: err.response.data });
  }
}

export function* checkTypeInPackage({ id }) {
  try {
    const { data } = yield checkTypeContest(id);
    if (!_.isEmpty(data)) {
      const contests = yield someContest(data);
      yield put({ type: ACTION.SUCCESS_ALL_CONTESTS, contests });
    }
  } catch (err) {
    yield put({ type: ACTION.ERROR_CONTEST, message: err.response.data });
  }
}


export function* changeContestPicture({ formData, id, history }) {
  try {
    const { data } = yield changePictureContests(formData, id);
    yield put({ type: ACTION.SUCCESS_CONTEST, contest: data });
    data && toastSuccess('Successfully!');
  } catch (err) {
    toastError(err.response.data.message);
    history.push(`/contest/${id}`);
    yield put({ type: ACTION.ERROR_CONTEST, message: err.response.data });
  }
}

export function* getDraftContests() {
  try {
    const { data } = yield draftContests();
    yield put({ type: ACTION.SUCCESS_DRAFTS, contests: data });
  } catch (err) {
    yield put({ type: ACTION.ERROR_CONTEST, message: err.response.data });
  }
}

export function* pushNewData({contest, file}) {
  try {
    const { contestReducer } = yield select();
    const contests = contestReducer.arrayNewContests;
    contests.push(contest);
    const files = contestReducer.files;
    files.push(file);
    yield put({ type: ACTION.PUSH_NEW_DATA, contests, files });
  } catch (err) {
    yield put({ type: ACTION.ERROR_CONTEST, message: err.response.data });
  }
}

// CREATIVE

export function* getActiveContests() {
  try {
    const { data } = yield allActiveContests();
    yield put({ type: ACTION.SUCCESS_ALL_CONTESTS, contests: data });
  } catch (err) {
    yield put({ type: ACTION.ERROR_CONTEST, message: err.response.data });
  }
}
export function* setFilter({ filterData }) {
  try {
    const { data } = yield setFilterContest(filterData);
    yield put({ type: ACTION.SUCCESS_ALL_CONTESTS, contests: data });
  } catch (err) {
    yield put({ type: ACTION.ERROR_CONTEST, message: err.response.data });
  }
}
export function* toggleFavoriteContest({ idContest, userId }) {
  try {
    const { data } = yield favoriteContestToggle(idContest, userId);
    const contests = yield favoriteContest(data);
    yield put({ type: ACTION.SUCCESS_FAVORITE_CONTESTS, contests });
    data && toastSuccess('Successfully!');
  } catch (err) {
    yield put({ type: ACTION.ERROR_CONTEST, message: err.response.data });
  }
}

export function* favoriteContest(contest) {
  try {
    const { contestReducer } = yield select();
    const favoriteContests = _.cloneDeep(contestReducer.favoriteContests);
    const index = contestReducer.favoriteContests.findIndex(e => e.id === contest.id);
    if (index === -1) {
      favoriteContests.push(contest);
    } else {
      _.remove(favoriteContests, item => item.id === contest.id);
    }
    return favoriteContests;
  } catch (err) {
    return err;
  }
}
