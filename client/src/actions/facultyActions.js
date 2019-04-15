import axios from 'axios'

import {
  CLEAR_ERRORS,
  GET_ERRORS,
  GET_ERRORS_IN_APPLICATIONS,
  GET_FACULTY_ERRORS,
  GET_FACULTY_HOME,
  GET_TA_APPLICATIONS,
  LOADING,
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
  console.log("accepting TA action")

  axios
    .post(`/api/faculty/applications/accept/${id}`)
    .then(res =>
      window.location.reload()
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
export const rejectTA = (id) => dispatch => {
  console.log("Started rejecting TA")
  console.log("rejecting TA action")

  axios
    .post(`/api/faculty/applications/reject/${id}`)
    .then(res =>
        window.location.reload()
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
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
