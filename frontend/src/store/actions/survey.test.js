import axios from 'axios';
import * as actionCreators from './survey';
import store from '../store';

describe('ActionCreators', () => {
  it('should fetch surveyList', (done) => {
    const stubSurveyList = [];

    axios.get = jest.fn(() => new Promise((res) => {
      const result = { ststus: 200, data: stubSurveyList };
      res(result);
    }));
    store.dispatch(actionCreators.getSurveyList())
      .then(() => {
        const newState = store.getState();
        expect(newState.svl.survey_list).toEqual(stubSurveyList);
        expect(axios.get).toHaveBeenCalledTimes(1);
        done();
      });
  });
  it('should fetch survey', (done) => {
    const stubSurvey = {
      item: [],
    };

    axios.get = jest.fn(() => new Promise((res) => {
      const result = { ststus: 200, data: stubSurvey };
      res(result);
    }));
    store.dispatch(actionCreators.getSurvey())
      .then(() => {
        const newState = store.getState();
        expect(newState.sv.survey).toEqual(stubSurvey);
        expect(axios.get).toHaveBeenCalledTimes(1);
        done();
      });
  });
  it('should post survey', (done) => {
    const stubSurvey = {
      item: [],
    };

    axios.post = jest.fn(() => new Promise((res) => {
      const result = { ststus: 200, data: stubSurvey };
      res(result);
    }));
    store.dispatch(actionCreators.addOngoingSurvey())
      .then(() => {
        const newState = store.getState();
        expect(newState.sv.ongoing_survey).toEqual(stubSurvey);
        expect(axios.post).toHaveBeenCalledTimes(1);
        done();
      });
  });
});
