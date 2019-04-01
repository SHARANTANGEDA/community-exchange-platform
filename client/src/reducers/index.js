import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import homeReducer from './homeReducer';
import profileReducer from './profileReducer';
import hodReducer from './hodReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  home: homeReducer,
  profile: profileReducer,
  hod: hodReducer
})