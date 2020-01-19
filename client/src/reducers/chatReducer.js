import ACTION from '../actions/actionTypes';

const initialState = {
  openChat: false,
  allChats: [],
  currentChat: {},
  showListChats: true,
  messageContent: '',
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.SUCCESS_CHAT: {
      return {
        ...state,
        currentChat: { ...action.currentChat },
        error: null,
      };
    }
    case ACTION.SUCCESS_ALL_CHATS: {
      return {
        ...state,
        allChats: action.allChats,
        error: null,
      };
    }
    case ACTION.SHOW_LIST_CHATS: {
      return {
        ...state,
        showListChats: action.value,
        error: null,
      };
    }
    case ACTION.CHANGE_MESSAGE_CONTENT: {
      return {
        ...state,
        messageContent: action.content,
        error: null,
      };
    }
    case ACTION.RESET_CURRENT_CHAT: {
      return {
        ...state,
        currentChat: {},
        showListChats: true,
        messageContent: '',
        error: null,
      };
    }
    case ACTION.DISPLAY_CHAT: {
      return {
        ...state,
        openChat: action.stateChat,
      };
    }
    case ACTION.ERROR_CHAT: {
      return {
        ...state,
        currentChat: {},
        error: action.message,
      };
    }

    default: {
      return state;
    }
  }
}
