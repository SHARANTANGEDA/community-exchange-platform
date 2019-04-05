import axios from 'axios';

import {
  CLEAR_ERRORS,
  LOADING,
  GET_FACULTY_HOME, GET_FACULTY_ERRORS, GET_ERRORS_IN_APPLICATIONS, GET_TA_APPLICATIONS, ACCEPT_TA_APPLICATION,
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

export const getTAApplications = () => dispatch => {
  console.log("Started Loading Ta applications page")
  dispatch(setLoading());
  console.log("In all applications actions")

  axios
    .get(`/api/faculty/applications`)
    .then(res =>
      dispatch({
        type: GET_TA_APPLICATIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS_IN_APPLICATIONS,
        payload: err.data
      })
    );
}
export const acceptTA = (id) => dispatch => {
  console.log("Started accepting TA")
  dispatch(setLoading());
  console.log("accepting TA action")

  axios
    .get(`/api/faculty/applications/${id}/accept`)
    .then(res =>
      dispatch({
        type: ACCEPT_TA_APPLICATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS_IN_APPLICATIONS,
        payload: err.data
      })
    );
}
export const rejectTA = (id) => dispatch => {
  console.log("Started rejecting TA")
  dispatch(setLoading());
  console.log("rejecting TA action")

  axios
    .get(`/api/faculty/applications/${id}/reject`)
    .then(res =>
      dispatch({
        type: ACCEPT_TA_APPLICATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS_IN_APPLICATIONS,
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
