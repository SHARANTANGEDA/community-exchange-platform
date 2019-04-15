import axios from 'axios'

import {
  ADD_ANSWER,
  ALL_QUESTIONS,
  APPLY_TA,
  ASK_QUESTION,
  CLEAR_ERRORS,
  GET_COMMENT,
  GET_COURSES,
  GET_ERRORS,
  GET_NO_COURSE,
  GET_QUESTION,
  HOME_QUESTIONS,
  QUESTION_LOADING
} from './types'
import { setLoading } from './hodActions'

// Add Post
export const askQuestion = questionData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/questions/ask', questionData)
    .then(res =>
      dispatch({
        type: ASK_QUESTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const upVoteAnswer = (id,answerId) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/answers/upVote/${id}/${answerId}`)
    .then(res =>
      window.location.reload()
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const downVoteAnswer = (id,answerId) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/answers/downVote/${id}/${answerId}`)
    .then(res =>
      window.location.reload()
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const upVoteQuestion = (id) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/questions/upVote/${id}`)
    .then(res =>
      window.location.reload()
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const downVoteQuestion = (id) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/questions/downVote/${id}`)
    .then(res =>
      window.location.reload()
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Post
export const applyTA = courseCode => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/users/applyForTA', courseCode)
    .then(res =>
      dispatch({
        type: APPLY_TA,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get Questions for home
export const getCourseCodes = () => dispatch => {
  dispatch(setLoading());
  axios
    .get('/api/users/getAllCourses')
    .then(res => {
        dispatch({
          type: GET_COURSES,
          payload: res.data
        })
      }
    )
    .catch(err => {
        console.log("ERROR in Getting Courses")
        dispatch({
          type: GET_NO_COURSE,
          payload: null
        })
      }

    );
};

//Add Comments
export const addComment = (id, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/comments/question/${id}`, commentData)
    .then(res =>
      dispatch({
        type: GET_COMMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add Comments
export const addAnswerComment = (id,ansId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/comments/answer/${id}/${ansId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_COMMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add Answers
export const addAnswer = (id, answerData) => dispatch => {
  dispatch(clearErrors());
  console.log({Answer: answerData})
  axios
    .post(`/api/answers/answer/${id}`, answerData)
    .then(res =>
      dispatch({
        type: ADD_ANSWER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


//Get Questions for home
export const getQuestionsHome = () => dispatch => {
  console.log("Started Loading")
  dispatch(setQuestionLoading());
  console.log("In Questions")
  axios
    .get('/api/questions/home')
    .then(res => {
        console.log({'Actions':res.data});
        dispatch({
          type: HOME_QUESTIONS,
          payload: res.data
        })
      }
    )
    .catch(err => {
      console.log("ERROR in Getting Questions")
        dispatch({
          type: HOME_QUESTIONS,
          payload: null
        })
    }

    );
};

//Get Questions for home
export const getAllQuestions = () => dispatch => {
  console.log("Started Loading")
  dispatch(setQuestionLoading());
  console.log("In Questions")
  axios
    .get('/api/questions/')
    .then(res => {
        console.log({'Actions':res.data});
        dispatch({
          type: ALL_QUESTIONS,
          payload: res.data
        })
      }
    )
    .catch(err => {
        console.log("ERROR in Getting Questions")
        dispatch({
          type: ALL_QUESTIONS,
          payload: null
        })
      }

    );
};
export const getQuestionById = id => dispatch => {
  console.log("Started Loading In profile")
  dispatch(setQuestionLoading());
  console.log("In profile action")

  axios
    .get(`/api/questions/${id}`)
    .then(res =>
      dispatch({
        type: GET_QUESTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_QUESTION,
        payload: null
      })
    );
};
// Profile loading
// export const setProfileLoading = () => {
//   return {
//     type: PROFILE_LOADING
//   };
// };
// Set loading state
export const setQuestionLoading = () => {
  return {
    type: QUESTION_LOADING
  };
};


// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
