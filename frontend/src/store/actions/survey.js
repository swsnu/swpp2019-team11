import axios from 'axios';
import * as actionTypes from './actionTypes';

export const participateSurvey_ = () => ({ type: actionTypes.PARTICIPATE_SURVEY });

export const participateSurvey = (id, data) => (dispatch) => axios.post(`/api/participate/${String(id)}/`, data)
  .then((res) => {
    dispatch(participateSurvey_());
    return res;
  });

export const getSurveyList_ = (survey_list) => ({
  type: actionTypes.GET_SURVEY_LIST, target: survey_list,
});

export const getSurveyList = (keyword) => (dispatch) => axios.get(`/api/search/${keyword}/`)
  .then((res) => {
    dispatch(getSurveyList_(res.data));
  });

export const getOngoingSurveyList_ = (ongoing_survey_list) => ({
  type: actionTypes.GET_ONGOING_SURVEY_LIST, target: ongoing_survey_list,
});

export const getOngoingSurveyList = () => (dispatch) => axios.get('/api/mypage/surveyOngoing/')
  .then((res) => {
    dispatch(getOngoingSurveyList_(res.data));
    return res;
  });

export const getOngoingSurvey_ = (ongoing_survey) => (
  {
    type: actionTypes.GET_ONGOING_SURVEY,
    target: ongoing_survey,
  }
);

export const getOngoingSurvey = (id) => (dispatch) => axios.get(`/api/survey/ongoing/${String(id)}/`)
  .then((res) => {
    dispatch(getOngoingSurvey_(res.data));
    return res;
  });

export const addOngoingSurvey_ = () => ({ type: actionTypes.ADD_ONGOING_SURVEY });

export const addOngoingSurvey = (survey) => (dispatch) => axios.post('/api/make/', survey).then((res) => {
  dispatch(addOngoingSurvey_());
  return res;
});

export const getCompletedSurvey_ = (survey_completed) => ({ type: actionTypes.GET_COMPLETED_SURVEY, target: survey_completed });

export const getCompletedSurvey = (id) => (dispatch) => axios.get(`/api/survey/completed/${id}/`).then((res) => {
  dispatch(getCompletedSurvey_(res.data));
  return res;
});

/*
export const uploadSurvey_ = (survey) => ({ type: actionTypes.ADD_SURVEY, target: survey });

export const uploadSurvey = (survey) => (dispatch) => axios.post('/api/survey/', survey).then((res) => {
  dispatch(uploadSurvey_(res.data));
});
*/
