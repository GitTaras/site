import ACTION from './actionTypes';

// AUTH
export const auth = (user, history) => ({
  type: ACTION.AUTH,
  user,
  history,
});
export const createNewUser = (user, history) => ({
  type: ACTION.CREATE_USER,
  user,
  history,
});
export const currentUser = () => ({
  type: ACTION.GET_CURRENT_USER,
});
export const logout = (history, id) => ({
  type: ACTION.LOGOUT,
  history,
  id
});
export const changeProfilePicture = formData => ({
  type: ACTION.CHANGE_USER_PHOTO,
  formData,
});
export const editAccount = (dataUser, history) => ({
  type: ACTION.CHANGE_USER_INFO,
  dataUser,
  history,
});


// CONTESTS
export const createNewContest = (contest, history) => ({
  type: ACTION.CREATE_CONTEST,
  contest,
  history,
});
export const buyContest = (cardData, history) => ({
  type: ACTION.PAYMENT,
  cardData,
  history,
});
export const editContest = (id, body) => ({
  type: ACTION.EDIT_CONTEST,
  id,
  body,
});
export const getContests = () => ({
  type: ACTION.GET_CONTESTS,
});
export const getContestById = id => ({
  type: ACTION.GET_CONTEST_BY_ID,
  id,
});
export const checkTypeInPackage = id => ({
  type: ACTION.PACKAGE_INFO,
  id,
});
export const changeContestPicture = (formData, id, history) => ({
  type: ACTION.CHANGE_CONTEST_PHOTO,
  formData,
  id,
  history,
});
export const getActiveContests = () => ({
  type: ACTION.GET_ACTIVE_CONTESTS,
});
export const setFilter = filterData => ({
  type: ACTION.FILTER_CONTEST,
  filterData,
});
export const pushNewData = (contest, file) => ({
  type: ACTION.PUSH_NEW_CONTEST,
  contest,
  file,
});
export const getDraftContests = () => ({
  type: ACTION.GET_DRAFT_CONTESTS,
});


// ENTRIES
export const getEntries = (field, param, contestId) => ({
  type: ACTION.GET_ENTRIES,
  field,
  param,
  contestId,
});
export const createEntry = (entryData, idContest, history, ownerContestId) => ({
  type: ACTION.CREATE_ENTRIES,
  entryData,
  idContest,
  history,
  ownerContestId,
});
export const acceptEntry = (idEntry, idContest) => ({
  type: ACTION.ACCEPT_ENTRY,
  idEntry,
  idContest,
});
export const rejectEntry = (idEntry, idContest) => ({
  type: ACTION.REJECT_ENTRY,
  idEntry,
  idContest,
});
export const favoriteStatus = (id, idContest) => ({
  type: ACTION.FAVORITE_STATUS_ENTRY,
  id,
  idContest,
});

export const toggleFavoriteContest = (idContest, userId) => ({
  type: ACTION.FAVORITE_STATUS_CONTEST,
  idContest,
  userId,
});

export const getLikedContests = idContest => ({
  type: ACTION.ALL_FAVORITE_CONTESTS,
  idContest,
});

export const writeOffMoney = (cardData, sum) => ({
  type: ACTION.CASH_OUT,
  cardData,
  sum,
});

// CHATS
export const showChat = value => ({
  type: ACTION.SHOW_CHAT,
  value,
});
export const startChat = (recipient, sender) => ({
  type: ACTION.START_CHAT,
  recipient,
  sender
});
export const getAllChatsForUser = () => ({
  type: ACTION.ALL_CHATS_FOR_USER,
});
export const showListChats = value => ({
  type: ACTION.SHOW_LIST_CHATS,
  value,
});
export const checkCurrentChatInRecipient = senderData => ({
  type: ACTION.CHECK_CURRENT_CHAT_IN_RECIPIENT,
  senderData,
});
export const resetCurrentChat = () => ({
  type: ACTION.RESET_CURRENT_CHAT,
});

// MESSAGES
export const addMessage = message => ({
  type: ACTION.SUCCESS_SOME_MESSAGES,
  message,
});
export const createMessage = info => ({
  type: ACTION.SEND_MESSAGE,
  info,
});
export const changeMessageContent = content => ({
  type: ACTION.CHANGE_MESSAGE_CONTENT,
  content,
});
export const readMessageStatus = (unreadMessages, sender) => ({
  type: ACTION.READ_MESSAGE_STATUS,
  unreadMessages,
  sender
});
