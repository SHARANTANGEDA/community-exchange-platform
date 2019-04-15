import { ADD_COURSE, GET_COURSES, GET_NO_COURSE, LOADING } from '../actions/types'

const initialState = {
  loading: true,
  courses: null,
  course: null
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
    case ADD_COURSE:
      console.log("In add course")
      return {
        ...state,
        course: [action.payload, ...state.course]
      };

    case GET_COURSES:
      console.log("In Course loading")
      return {
        ...state,
        courses: action.payload,
        loading: false
      };
    case GET_NO_COURSE:
      console.log("In NO Course loading")
      return {
        ...state,
        courses: action.payload,
        loading: false
      }
    default:
      return state;

  }
}
