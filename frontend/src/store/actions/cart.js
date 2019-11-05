import axios from 'axios';
import * as actionTypes from './actionTypes';

const getCart_ = (data) => ({ type: actionTypes.GET_CART, target: data });
export const getCart = () => (dispatch) => axios.get('/api/mycart/')
  .then((res) => {
    dispatch(getCart_(res.data));
  });

const addCart_ = () => ({ type: actionTypes.ADD_CART });
export const addCart = (id) => (dispatch) => {
  const data = { id };
  return axios.post('/api/mycart/', data)
    .then((res) => {
      dispatch(addCart_());
      return res;
    });
};

const deleteCart_ = (data) => ({ type: actionTypes.DELETE_CART, target: data });
export const deleteCart = (id_list) => (dispatch) => {
  const data = { id_list };
  return axios.put('/api/mycart/', data)
    .then(() => {
      dispatch(deleteCart_(id_list));
    });
};

const getML_ = (data) => ({ type: actionTypes.GET_ML, target: data });
export const getML = (id_list) => (dispatch) => {
  const data = { id_list };
  return axios.put('/api/ml/', data)
    .then((res) => {
      dispatch(getML_(res.data));
    });
};
