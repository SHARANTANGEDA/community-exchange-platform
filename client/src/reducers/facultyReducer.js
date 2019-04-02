import {
  LOADING, GET_HOME, GET_HOME_NO_FACULTY, GET_FACULTY_HOME, GET_FACULTY_ERRORS
} from '../actions/types'

const initialState = {
  loading: true,
  home: null,
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
    case GET_FACULTY_ERRORS:
      return {
        ...state,
        home: action.payload,
        error: true,
        loading: false
      }

    default:
      return state;

  }
}
