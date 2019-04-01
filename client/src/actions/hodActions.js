import axios from 'axios';

import {
  GET_HOME,
  CLEAR_ERRORS,
  GET_HOME_NO_FACULTY,
  LOADING,

} from './types'




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
