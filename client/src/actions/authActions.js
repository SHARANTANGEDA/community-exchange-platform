import {
  GET_ALL_DEPARTMENTS,
  GET_ERRORS,
  GET_ERRORS_IN_APPLICATIONS,
  GET_TA_APPLICATIONS,
  SET_CURRENT_USER
} from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';
import { setLoading } from './facultyActions'


export const getDepartments = () => dispatch => {
  console.log("Started Loading Ta applications page")
  dispatch(setLoading());
  console.log("In all applications actions")

  axios
    .get(`/api/department/allDepartments`)
    .then(res =>
      dispatch({
        type: GET_ALL_DEPARTMENTS,
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
export const googleLogin = () => dispatch => {
  console.log('In login route')

  axios.get('/api/users/google')
    .then(res => {
      console.log({result: res})
    })
    .catch(err => {
        console.log(err)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }
    );
};
export const successRoute = (history) => dispatch => {
  console.log('In success route')
  axios.get('/api/users/successGoogle')
    .then(res => {
      console.log({result: res.data})
      if(res.data.success) {
        const {token} = res.data;
        localStorage.setItem('jwtToken',token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
      } else {
        console.log(res)
        history.push('/googleRegister');
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const googleRegister = (userData) => dispatch => {
  axios.post('/api/users/googleRegister',userData)
    .then(res => {
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
}
//Register User
export const registerFaculty = (userData,history) => dispatch => {
  axios.post('/api/faculty/register', userData)
    .then(res => history.push('/facultyLogin'))//TODO Write for jwt token here
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

export const adminLogin = userData => dispatch => {
  axios.post('/api/admin/login',userData)
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

export const hodLogin = userData => dispatch => {
  axios.post('/api/hod/login',userData)
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



export const facultyLogin = userData => dispatch => {
  axios.post('/api/faculty/login',userData)
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