import {
  ACCEPT_TA_APPLICATION,
  GET_ERRORS_IN_APPLICATIONS,
  GET_FACULTY_ERRORS,
  GET_FACULTY_HOME,
  GET_TA_APPLICATIONS,
  LOADING,
  REJECT_TA_APPLICATION
} from '../actions/types'

const initialState = {
  loading: true,
  home: null,
  taApplications: null,
  error: false
};

export default function(state = initialState, action) {
  console.log({'facultyReducer':action.payload});
  switch (action.type) {
    case LOADING:
      console.log("In faculty Reducer loading")
      return {
        ...state,
        loading: true
      }
    case GET_FACULTY_HOME:
      return {
        ...state,
        home: action.payload,
        error:false,
        loading: false
      };
    case ACCEPT_TA_APPLICATION:
      return {
        ...state,
        loading: false
      }
    case REJECT_TA_APPLICATION:
      return {
        ...state,
        loading: false
      }
    case GET_TA_APPLICATIONS:
      return {
        ...state,
        taApplications: action.payload,
        loading: false
      }
    case GET_FACULTY_ERRORS:
      return {
        ...state,
        home: action.payload,
        error: true,
        loading: false
      }
    case GET_ERRORS_IN_APPLICATIONS:
      return {
        ...state,
        taApplications: action.payload,
        loading: false
      }
    default:
      return state;

  }
}
