import * as actionTypes from './actionTypes'
import axios from "axios";

export const getSurveyList_ = (survey_list) =>{
  return {type: actionTypes.GET_SURVEY_LIST, target: survey_list}
};

export const getSurveyList = (keyword) => {
  return dispatch => {
    return axios.get("/api/search/"+keyword+"/").then(res => {
      dispatch(getSurveyList_(res.data))
    })
  }
};


export const getSurvey_ = (survey) => {
  return {type: actionTypes.GET_SURVEY, target: survey}
}

export const getSurvey = (id) => {
  return dispatch => {
    return axios.get("/api/survey/"+id+"/").then(res => {
      dispatch(getSurvey_(res.data))
    })
  }
}