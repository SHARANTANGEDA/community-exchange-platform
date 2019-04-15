import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import homeReducer from './homeReducer'
import profileReducer from './profileReducer'
import hodReducer from './hodReducer'
import courseReducer from './courseReducer'
import facultyReducer from './facultyReducer'
import adminReducer from './adminReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  home: homeReducer,
  profile: profileReducer,
  hod: hodReducer,
  courses: courseReducer,
  faculty: facultyReducer,
  admin: adminReducer
})