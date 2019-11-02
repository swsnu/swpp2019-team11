import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getSurveyList_ = (survey_list) => ({ type: actionTypes.GET_SURVEY_LIST, target: survey_list });

export const getSurveyList = (keyword) => (dispatch) => axios.get(`/api/search/${keyword}/`).then((res) => {
  dispatch(getSurveyList_(res.data));
});


export const getSurvey_ = (survey) => ({ type: actionTypes.GET_SURVEY, target: survey });

export const getSurvey = (id) => (dispatch) => axios.get(`/api/survey/${id}/`).then((res) => {
  dispatch(getSurvey_(res.data));
});
