import * as actionTypes from './actionTypes'
import axios from "axios";


  export const getItems_ = (items) => {
      return {type: actionTypes.GET_ITEM_ALL, target: items}
  };

  export const getItems = () => {
      return dispatch => {
          return axios.get("/api/item").then(res => {
              dispatch(getItems_(res.data))
          })
      }
  }

  export const getItemResponses_ = (responses) => {
      return{ type: actionTypes.RES_ALL, target: responses}
  };

  export const getItemResponses = () => {
      return dispatch => {
          return axios.get('/api/reponse/')
            .then(res => {
                dispatch(getItemResponses_(res.data))
            });
      }
  }