import axios from 'axios';
import * as actionTypes from './actionTypes';


export const getItems_ = (items) => ({ type: actionTypes.GET_ITEM_ALL, target: items });

export const getItems = () => (dispatch) => axios.get('/api/item').then((res) => {
  dispatch(getItems_(res.data));
});

export const getItemResponses_ = (responses) => ({ type: actionTypes.RES_ALL, target: responses });

export const getItemResponses = () => (dispatch) => axios.get('/api/reponse/')
  .then((res) => {
    dispatch(getItemResponses_(res.data));
  });
