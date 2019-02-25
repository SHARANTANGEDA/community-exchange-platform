import axios from 'axios';

import {
  GET_OTHER_PROFILE,
  GET_MY_PROFILE,
  GET_ALL_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from './types';

// Get current profile
export const getMyAcccount = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type:   GET_MY_PROFILE,

        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MY_PROFILE,
        payload: {}
      })
    );
};

// Get profile by handle
export const getProfileById = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/publicProfile/${handle}`)
    .then(res =>
      dispatch({
        type: GET_OTHER_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_OTHER_PROFILE,
        payload: null
      })
    );
};

// Get all profiles
export const getAllProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  console.log("In All Profiles Action")
  axios
    .get('/api/publicProfile/')
    .then(res =>
      dispatch({
        type:   GET_ALL_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type:   GET_ALL_PROFILES,
        payload: null
      })
    );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
