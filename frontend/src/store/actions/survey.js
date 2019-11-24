import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getSurveyList_ = (survey_list) => ({
  type: actionTypes.GET_SURVEY_LIST, target: survey_list,
});

export const getSurveyList = (keyword) => (dispatch) => axios.get(`/api/search/${keyword}/`).then((res) => {
  dispatch(getSurveyList_(res.data));
});

export const getOngoingSurveyList_ = (ongoing_survey_list) => ({ type: actionTypes.GET_ONGOING_SURVEY_LIST, target: ongoing_survey_list });

export const getOngoingSurveyList = () => (dispatch) => axios.get('/api/participating/')
  .then((res) => {
    dispatch(getOngoingSurveyList_(res.data));
    return res;
  });

export const getOngoingSurvey_ = (survey) => ({type: actionTypes.GET_ONGOING_SURVEY, target: ongoing_survey });

export const getOngoingSurvey = (id) => (dispatch) => axios.get(`/api/survey/ongoing/${id}/`).then((res) => {
  dispatch(getOngoingSurvey_(res.data));
  return res;
})

export const getSurvey_ = (survey) => ({ type: actionTypes.GET_SURVEY, target: survey });

export const getSurvey = (id) => (dispatch) => axios.get(`/api/survey/${id}/`).then((res) => {
  dispatch(getSurvey_(res.data));
  return res;
});

export const uploadSurvey_ = (survey) => ({ type: actionTypes.ADD_SURVEY, target: survey });
export const uploadSurvey = (survey) => (dispatch) => axios.post('/api/survey/', survey).then((res) => {
  dispatch(uploadSurvey_(res.data));
});
