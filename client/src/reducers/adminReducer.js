import {
  LOADING,
  GET_HOME,
  GET_HOME_NO_FACULTY,
  GET_ALL_DEPARTMENTS,
  ASSIGN_FACULTY,
  GET_DETAILS,
  GET_DETAILS_GRAPH,
  GET_COURSE_DEPARTMENT
} from '../actions/types'

const initialState = {
  loading: true,
  loadingGraph: true,
  details: null,
  graphDetails: null,
  loadingTable:true,
  courseDetails:null
};

export default function(state = initialState, action) {
  console.log({'adminReducer':action.payload});
  switch (action.type) {
    case LOADING:
      console.log("In admin Reducer loading")
      return {
        ...state,
        loading: true,
        loadingGraph:true,
        loadingTable:true
      }
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
        loading: false
      };

    case GET_DETAILS_GRAPH:
      return {
        ...state,
        graphDetails: action.payload,
        loadingGraph: false
      }
    case GET_COURSE_DEPARTMENT:
      return {
        ...state,
        courseDetails: action.payload,
        loadingTable: false
      }

    default:
      return state;

  }
}
