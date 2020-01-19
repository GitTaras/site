import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import contestReducer from './contestReducer';
import entryReducer from './entryReducer';
import chatReducer from './chatReducer';
import messageReducer from './messageReducer';

const appReducer = combineReducers({
  authReducer,
  contestReducer,
  entryReducer,
  chatReducer,
  messageReducer,
  form: formReducer,
});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
