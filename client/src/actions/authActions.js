import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';

//Register User
export const registerUser = (userData,history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))//TODO Write for jwt token here
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
};

//Login User
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login',userData)
    .then(res => {
      //Saving to Local Storage
      const {token} = res.data;
      localStorage.setItem('jwtToken',token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
};

//Set Logged in User
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
};

//Log User Out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}