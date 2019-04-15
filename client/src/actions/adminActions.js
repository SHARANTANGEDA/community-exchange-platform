import axios from 'axios';

import {
  CLEAR_ERRORS, LOADING, GET_ERRORS, GET_COURSES, GET_NO_COURSE, GET_DETAILS, GET_DETAILS_GRAPH, GET_COURSE_DEPARTMENT
} from './types'

//Add Department
export const addDepartment = (userData,history) => dispatch => {
  axios.post('/api/admin/addDepartment', userData)
    .then(res => {history.push('/allDepartments')})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
};

export const getDetails = () => dispatch => {
  axios.get('/api/admin/adminCards')
    .then(res => {
      dispatch({
      type: GET_DETAILS,
      payload: res.data
    })
    }).catch(err =>
    dispatch({
      type: GET_NO_COURSE,
      payload: null
    })
  )
};
export const getGraphDetails = () => dispatch => {
  axios.get('/api/admin/adminGraphs')
    .then(res => {
      dispatch({
        type: GET_DETAILS_GRAPH,
        payload: res.data
      })
    }).catch(err =>
    dispatch({
      type: GET_NO_COURSE,
      payload: null
    })
  )
};
export const getNoOfCourses = () => dispatch => {
  axios.get('/api/admin/noOfCoursesInDep')
    .then(res => {
      dispatch({
        type: GET_COURSE_DEPARTMENT,
        payload: res.data
      })
    }).catch(err =>
    dispatch({
      type: GET_NO_COURSE,
      payload: null
    })
  )
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
