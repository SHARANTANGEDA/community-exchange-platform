import { HOME_QUESTIONS, QUESTION_LOADING } from '../actions/types'

const initialState = {
  question: null,
  questions: null,
  loading: false
};

export default function(state = initialState, action) {
  console.log({'HomeReducer':action.payload});
  switch (action.type) {
    case QUESTION_LOADING:
      console.log("IN HOME Reducer Question loading")
      return {
        ...state,
        loading: true,
      }
    case HOME_QUESTIONS:
      console.log("IN HOME Reducer Question")
      return {
        ...state,
        questions: action.payload,
        loading: false
      };
    default:
      return state;

  }
}
