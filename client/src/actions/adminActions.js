import axios from 'axios';

import {
  CLEAR_ERRORS, LOADING, GET_ERRORS, ADD_DEPARTMENT
} from './types'

//Add Department
export const addDepartment = (userData) => dispatch => {
  axios.post('/api/admin/addDepartment', userData)
    .then(res => {
      history.push('/addDepartment')
      dispatch({
          type: ADD_DEPARTMENT,
          payload: res.data
        }
      )
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
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
