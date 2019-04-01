import {
  LOADING, GET_HOME, GET_HOME_NO_FACULTY, GET_COURSES, GET_NO_COURSE
} from '../actions/types'

const initialState = {
  loading: true,
  error: false,
  courses: null
};

export default function(state = initialState, action) {
  console.log({'Course Reducer':action.payload});
  switch (action.type) {
    case LOADING:
      console.log("In Course Reducer loading")
      return {
        ...state,
        loading: true
      }
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false,
        error: false
      };
    case GET_NO_COURSE:
      return {
        ...state,
        courses: action.payload,
        error: true,
        loading: false
      }
    default:
      return state;

  }
}
