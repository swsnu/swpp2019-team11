import * as actionTypes from './actionTypes';
import axios from 'axios';

const getCart_ = (data) => {
  return {type: actionTypes.GET_CART, target: data};
}
export const getCart = () => {
  return (dispatch) => {
    return axios.get('/api/mycart/')
      .then((res) =>  {
        dispatch(getCart_(res.data));
      });
  }
}

const addCart_ = () => {
  return {type: actionTypes.ADD_CART};
}
export const addCart = (id) => {
  return (dispatch) => {
    const data = {'id': id};
    return axios.post('/api/mycart/', data)
      .then((res) => {
        dispatch(addCart_());
      });
  }
}

const deleteCart_ = (data) => {
  return {type: actionTypes.DELETE_CART, target: data}
}
export const deleteCart = (id_list) => {
  return (dispatch) => {
    const data = {'id_list': id_list};
    return axios.put('/api/mycart/', data)
      .then((res) => {
        dispatch(deleteCart_(id_list));
      });
  }
}