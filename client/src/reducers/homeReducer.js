import {
  QUESTION_LOADING,
  HOME_QUESTIONS, ASK_QUESTION, ALL_QUESTIONS
} from '../actions/types'

const initialState = {
  question: null,
  questions: [],
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
      return {
        ...state,
        questions: action.payload,
        loading: false
      };
    case ALL_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false
      };
    case ASK_QUESTION:
      console.log("IN HOME Reducer Ask Question")
      return {
        ...state,
        questions: [action.payload, ...state.questions]
      };
    default:
      return state;

  }
}
