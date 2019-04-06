import {
  LOADING, GET_HOME, GET_HOME_NO_FACULTY, GET_ALL_DEPARTMENTS, ASSIGN_FACULTY
} from '../actions/types'

const initialState = {
  loading: true,
  faculty: false,
  home: null
};

export default function(state = initialState, action) {
  console.log({'hodReducer':action.payload});
  switch (action.type) {
    case LOADING:
      console.log("In HOD Reducer loading")
      return {
        ...state,
        loading: true
      }
    case GET_HOME:
      return {
        ...state,
        home: action.payload,
        loading: false,
        faculty: true
      };
    case GET_ALL_DEPARTMENTS:
      return {
        ...state,
        home: action.payload,
        loading: false,
      };
    case GET_HOME_NO_FACULTY:
      return {
        ...state,
        home: action.payload,
        faculty: false,
        loading: false
      }
    case ASSIGN_FACULTY:
      return {
        ...state,
        home: action.payload,
        faculty: false,
        loading: false
      }
    default:
      return state;

  }
}
