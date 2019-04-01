import {
  LOADING,GET_HOME, GET_HOME_NO_FACULTY
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
        loading: false
      };
    case GET_HOME_NO_FACULTY:
      return {
        ...state,
        home: action.payload,
        faculty: true,
        loading: false
      }
    default:
      return state;

  }
}
