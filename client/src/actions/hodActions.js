import axios from 'axios';

import {
  GET_HOME,
  CLEAR_ERRORS,
  GET_HOME_NO_FACULTY,
  LOADING,
  GET_COURSES,
  GET_NO_COURSE
} from './types'

export const getCourse = id => dispatch => {
  console.log("Started Loading All courses page")
  dispatch(setLoading());
  console.log("In all courses actions")

  axios
    .get(`/api/department/course/:id`)
    .then(res =>
      dispatch({
        type: GET_COURSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_NO_COURSE,
        payload: err.data
      })
    );

}

export const getAllCourses = () => dispatch => {
  console.log("Started Loading All courses page")
  dispatch(setLoading());
  console.log("In all courses actions")

  axios
    .get(`/api/department/allCourses`)
    .then(res =>
      dispatch({
        type: GET_COURSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_NO_COURSE,
        payload: err.data
      })
    );
}
//Get faculty for home
export const getHodHome = () => dispatch => {
  console.log("Started Loading HOD home")
  dispatch(setLoading());
  console.log("In HOD home actions")

  axios
    .get(`/api/department/home`)
    .then(res =>
      dispatch({
        type: GET_HOME,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_HOME_NO_FACULTY,
        payload: err.data
      })
    );
};

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
