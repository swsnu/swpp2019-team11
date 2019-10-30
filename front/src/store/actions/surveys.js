import * as actionTypes from './actionTypes'
import axios from "axios";

export const getSurveys_ = (surveys) =>{
  return {type: actionTypes.GET_SURVEYS, target: surveys}
};

export const getSurveys = (keyword) => {
  return dispatch => {
    return axios.get("/api/search/"+keyword+"/").then(res => {
      dispatch(getSurveys_(res.data))
    })
  }
};