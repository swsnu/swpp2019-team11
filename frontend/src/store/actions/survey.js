import axios from 'axios';
import * as actionTypes from './actionTypes';

export const participateSurvey_ = () => ({ type: actionTypes.PARTICIPATE_SURVEY });

export const participateSurvey = (id, data) => (dispatch) => axios.post(`/api/participate/${String(id)}/`, data)
  .then((res) => {
    dispatch(participateSurvey_());
    return res;
  });

export const getMyCompletedSurveys_ = (survey_list) => ({
  type: actionTypes.GET_SURVEY_LIST, target: survey_list,
});

export const getMyCompletedSurveys = () => (dispatch) => axios.get('/api/mypage/surveyCompleted/')
  .then((res) => {
    dispatch(getMyCompletedSurveys_(res.data));
    return res;
  });

export const getSurveyList_ = (survey_list) => ({
  type: actionTypes.GET_SURVEY_LIST, target: survey_list,
});

export const getSurveyList = (keyword) => (dispatch) => axios.get(`/api/search/${keyword}/`)
  .then((res) => {
    dispatch(getSurveyList_(res.data));
  });

export const getMyOngoingSurveys_ = (ongoing_survey_list) => ({
  type: actionTypes.GET_MY_ONGOING_SURVEYS, target: ongoing_survey_list,
});

export const getMyOngoingSurveys = () => (dispatch) => axios.get('/api/mypage/surveyOngoing/')
  .then((res) => {
    dispatch(getMyOngoingSurveys_(res.data));
    return res;
  });

export const getOngoingSurvey_ = (ongoing_survey) => ({
  type: actionTypes.GET_ONGOING_SURVEY,
  target: ongoing_survey,
});

export const getOngoingSurvey = (id) => (dispatch) => axios.get(`/api/survey/ongoing/${id}/`)
  .then((res) => {
    dispatch(getOngoingSurvey_(res.data));
    return res;
  });

export const addOngoingSurvey_ = () => ({ type: actionTypes.ADD_ONGOING_SURVEY });

export const addOngoingSurvey = (survey) => (dispatch) => axios.post('/api/make/', survey).then((res) => {
  dispatch(addOngoingSurvey_());
  return res;
});

export const getCompletedSurvey_ = (completed_survey) => ({
  type: actionTypes.GET_COMPLETED_SURVEY,
  target: completed_survey,
});

export const getCompletedSurvey = (id) => (dispatch) => axios.get(`/api/survey/completed/${id}/`).then((res) => {
  dispatch(getCompletedSurvey_(res.data));
  return res;
});

export const getParticipatingList_ = (ongoing_survey_list) => ({ type: actionTypes.GET_PARTICIPATING_LIST, target: ongoing_survey_list });

export const getParticipatingList = () => (dispatch) => axios.get('/api/participatinglist/').then((res) => {
  dispatch(getParticipatingList_(res.data));
  return res;
});

export const getParticipatedList_ = (ongoing_survey_list) => ({ type: actionTypes.GET_PARTICIPATED_LIST, target: ongoing_survey_list });
export const getParticipatedList = () => (dispatch) => axios.get('/api/participatedlist/').then((res) => {
  dispatch(getParticipatedList_(res.data));
});

export const clearParticipatingList = () => (dispatch) => dispatch({ type: actionTypes.CLEAR_PARTICIPATING_LIST });

export const deleteOngoingSurvey_ = () => ({ type: actionTypes.DELETE_ONGOING_SURVEY });

export const deleteOngoingSurvey = (id) => (dispatch) => axios.delete(`/api/survey/ongoing/${id}/`).then((res) => {
  dispatch(deleteOngoingSurvey_(res.data));
  return res;
});
