import ACTION from '../actions/actionTypes';

const initialState = {
  contest: null,
  error: null,
  allContests: [],
  favoriteContests: [],
  arrayNewContests: [],
  files: [],
  draftContests: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.SUCCESS_CONTEST: {
      return {
        ...state,
        contest: { ...state.contest, ...action.contest },
        error: null,
      };
    }

    case ACTION.SUCCESS_ALL_CONTESTS: {
      return {
        ...state,
        allContests: action.contests,
        arrayNewContests: [],
        files: [],
        error: null,
      };
    }

    case ACTION.SUCCESS_DRAFTS: {
      return {
        ...state,
        draftContests: action.contests,
        error: null,
      };
    }

    case ACTION.PUSH_NEW_DATA: {
      return {
        ...state,
        arrayNewContests: action.contests,
        files: action.files,
        error: null,
      };
    }

    case ACTION.FAVORITE_CONTESTS_FOR_USER: {
      return {
        ...state,
        favoriteContests: action.contests,
        error: null,
      };
    }
    case ACTION.SUCCESS_FAVORITE_CONTESTS: {
      return {
        ...state,
        favoriteContests: action.contests,
        error: null,
      };
    }
    case ACTION.ERROR_CONTEST: {
      return {
        ...state,
        contest: null,
        error: action.message,
      };
    }

    default: {
      return state;
    }
  }
}
