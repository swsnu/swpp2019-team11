import axios from 'axios';
import * as actionTypes from './actionTypes';

const signUp_ = (res) => ({ type: actionTypes.SIGNUP });
export const signUp = (username, email, password) => {
  const user = {
    username,
    email,
    password,
  };
  return (dispatch) => axios.post('/api/signup/', user)
    .then((res) => {
      dispatch(signUp_(res.status));
      return res;
    });
};

const logIn_ = (res) => ({ type: actionTypes.LOGIN });
export const logIn = (username, password) => {
  const user = { username, password };
  return (dispatch) => axios.post('/api/login/', user)
    .then((res) => {
      dispatch(logIn_(res.status));
      return res;
    });
};

const logOut_ = () => ({ type: actionTypes.LOGOUT });
export const logOut = () => (dispatch) => axios.get('/api/logout/')
  .then((res) => {
    dispatch(logOut_());
  });
