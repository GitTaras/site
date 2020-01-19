import ACTION from '../actions/actionTypes';

const initialState = {
  currentUser: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.SUCCESS_AUTH: {
      return {
        ...state,
        currentUser: action.currentUser,
        error: null,
      };
    }

    case ACTION.ERROR_AUTH: {
      return {
        ...state,
        currentUser: null,
        error: action.message,
      };
    }

    default: {
      return state;
    }
  }
}
