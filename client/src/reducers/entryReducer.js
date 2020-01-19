import ACTION from '../actions/actionTypes';

const initialState = {
  entry: null,
  allEntries: [],
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.SUCCESS_ENTRY: {
      return {
        ...state,
        contest: action.contest,
        error: null,
      };
    }

    case ACTION.ERROR_ENTRY: {
      return {
        ...state,
        contest: null,
        error: action.message,
      };
    }
    case ACTION.SUCCESS_ALL_ENTRIES: {
      return {
        ...state,
        allEntries: action.entries,
        error: null,
      };
    }
    case ACTION.SUCCESS_UPDATED_ENTRY: {
      return {
        ...state,
        allEntries: action.allEntries,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
}
