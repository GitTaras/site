import axios from 'axios';
import { restURL } from '../baseURL';
import '../../utils/networkHelper';

// AUTH
export const login = user => axios.post(`${restURL}/auth/signin`, user);
export const createUser = user => axios.post(`${restURL}/auth/signup`, user);
export const getCurrentUser = () => axios.get(`${restURL}/auth/get-user`);
export const changePhoto = formData => axios.put(`${restURL}/auth/set-photo`, formData);
export const changeAccount = dataUser => axios.put(`${restURL}/auth/`, dataUser);

// CONTESTS
export const createContest = contest => axios.post(`${restURL}/contest/`, contest);
export const payContest = cardData => axios.post(`${restURL}/contest/payment`, cardData);
export const changeContest = (id, body) => axios.put(`${restURL}/contest/${id}`, body);
export const allContests = () => axios.get(`${restURL}/contest/selection`);
export const findContest = id => axios.get(`${restURL}/contest/${id}`);
export const getLikedContestsForUser = idContest => axios.get(`${restURL}/contest/favorite/${idContest}`);
export const favoriteContestToggle = (idContest, userId) => axios.put(`${restURL}/contest/favorite/${idContest}`, { userId });
export const checkTypeContest = id => axios.post(`${restURL}/contest/${id}`);
export const changePictureContests = (formData, id) => axios.put(`${restURL}/contest/${id}/img`, formData);
export const draftContests = () => axios.get(`${restURL}/contest/draft`);

// CREATIVE
export const allActiveContests = () => axios.get(`${restURL}/contest/`);
export const createNewEntry = (entryData, idContest) => axios.post(`${restURL}/entry/create/${idContest}`, entryData);
export const setFilterContest = filterData => axios.get(`${restURL}/contest/filter?${filterData}`);
export const writeOffCash = (cardData, sum) => axios.put(`${restURL}/entry/`, { cardData, sum });

// ENTRIES
export const allEntries = (field, param, contestId) => axios.post(`${restURL}/entry/`, { field, param, contestId });
export const acceptEntryStatus = (idEntry, idContest) => axios.put(`${restURL}/entry/accept/${idContest}`, { idEntry });
export const rejectEntryStatus = (idEntry, idContest) => axios.put(`${restURL}/entry/reject/${idContest}`, { idEntry });
export const setFavoriteStatus = (id, idContest) => axios.put(`${restURL}/entry/favorite/${idContest}`, { id });

// CHATS
export const beginChat = (recipient, sender) => axios.post(`${restURL}/chat/`, { recipient, sender });
export const allChatsForUser = () => axios.get(`${restURL}/chat/`);

// MESSAGES
export const createMessage = (chat_id, content) => axios.post(`${restURL}/chat/message`, { chat_id, content });
export const changeStatusMessages = unreadMessages => axios.put(`${restURL}/chat/message`, { unreadMessages });
