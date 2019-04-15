import {
  ADD_ANSWER,
  ALL_QUESTIONS,
  APPLY_TA,
  ASK_QUESTION,
  GET_COMMENT,
  GET_QUESTION,
  HOME_QUESTIONS,
  QUESTION_LOADING
} from '../actions/types'

const initialState = {
  question: null,
  questions: [],
  loading: true,
  comment:null,
  answer: null,
  courseCode: null
};

export default function(state = initialState, action) {
  console.log({'HomeReducer':action.payload});
  switch (action.type) {
    case QUESTION_LOADING:
      console.log("IN HOME Reducer Question loading")
      return {
        ...state,
        loading: true
      }
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
    case ADD_ANSWER:
      console.log("IN HOME Reducer Answer Question")
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
    case APPLY_TA:
      console.log("In application reducer")
      return {
        ...state,
        courseCode: action.payload
      }
    default:
      return state;

  }
}
