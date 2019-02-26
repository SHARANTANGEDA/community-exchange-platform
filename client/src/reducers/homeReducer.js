import {
  QUESTION_LOADING,
  HOME_QUESTIONS, ASK_QUESTION, ALL_QUESTIONS, GET_QUESTION, GET_COMMENT, GET_ANSWER, CLEAR_ERRORS
} from '../actions/types'

const initialState = {
  question: {},
  questions: [],
  loading: true,
  comment:{},
  answer: {}
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
    case CLEAR_ERRORS:
      return {};
    case HOME_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false
      };
    case GET_QUESTION:
      return {
        ...state,
        question: action.payload,
        loading: false
      }
    case GET_COMMENT:
      return {
        ...state,
        comment: action.payload,
        loading: false
      }
    case GET_ANSWER:
      return {
        ...state,
        answer: action.payload,
        loading: false
      }
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
