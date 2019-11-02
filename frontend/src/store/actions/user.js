import axios from 'axios';
import * as actionTypes from './actionTypes';

const signUp_ = () => ({ type: actionTypes.SIGNUP });
export const signUp = (username, email, password) => {
  const user = {
    username,
    email,
    password,
  };
  return (dispatch) => axios.post('/api/signup/', user)
    .then((res) => {
      dispatch(signUp_());
      return res;
    });
};

const logIn_ = () => ({ type: actionTypes.LOGIN });
export const logIn = (username, password) => {
  const user = { username, password };
  return (dispatch) => axios.post('/api/login/', user)
    .then((res) => {
      dispatch(logIn_());
      return res;
    });
};

const logOut_ = () => ({ type: actionTypes.LOGOUT });
export const logOut = () => (dispatch) => axios.get('/api/logout/')
  .then(() => {
    dispatch(logOut_());
  });
