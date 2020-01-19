import ACTION from '../actions/actionTypes';

const initialState = {
  allMessageForChat: [],
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.ALL_MESSAGES_FOR_CHAT: {
      return {
        ...state,
        allMessageForChat: action.allMessageForChat,
        error: null,
      };
    }

    case ACTION.ERROR_MESSAGE: {
      return {
        ...state,
        error: action.message,
      };
    }

    default: {
      return state;
    }
  }
}
