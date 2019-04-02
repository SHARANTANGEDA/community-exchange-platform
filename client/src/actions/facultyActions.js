import axios from 'axios';

import {
  CLEAR_ERRORS,
  LOADING,
  GET_FACULTY_HOME,GET_FACULTY_ERRORS
} from './types'

export const getFacultyHome = () => dispatch => {
  console.log("Started Loading All courses page")
  dispatch(setLoading());
  console.log("In all courses actions")

  axios
    .get(`/api/faculty/home`)
    .then(res =>
      dispatch({
        type: GET_FACULTY_HOME,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FACULTY_ERRORS,
        payload: err.data
      })
    );
}

export const setLoading = () => {
  return {
    type: LOADING
  };
};


// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
