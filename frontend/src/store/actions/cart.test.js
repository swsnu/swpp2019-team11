import axios from 'axios';
import * as actionCreators from './cart';
import store from '../store';

describe('ActionCreators', () => {
  it('should get Cart', (done) => {
    const stubSurveyList = [];

    axios.get = jest.fn(() => new Promise((res) => {
      const result = { ststus: 200, data: stubSurveyList };
      res(result);
    }));
    store.dispatch(actionCreators.getCart())
      .then(() => {
        const newState = store.getState();
        expect(newState.ct.survey_list).toEqual(stubSurveyList);
        expect(axios.get).toHaveBeenCalledTimes(1);
        done();
      });
  });
  it('should delete cart', (done) => {
    const stubSurveyList = [];

    axios.put = jest.fn(() => new Promise((res) => {
      const result = { ststus: 200, data: stubSurveyList };
      res(result);
    }));
    store.dispatch(actionCreators.deleteCart())
      .then(() => {
        const newState = store.getState();
        expect(newState.ct.survey_list).toEqual(stubSurveyList);
        expect(axios.get).toHaveBeenCalledTimes(1);
        done();
      });
  });
  it('should add cart', (done) => {
    const stubSurveyList = [];

    axios.post = jest.fn(() => new Promise((res) => {
      const result = { ststus: 200, data: 1 };
      res(result);
    }));
    store.dispatch(actionCreators.addCart())
      .then(() => {
        const newState = store.getState();
        expect(newState.ct.survey_list).toEqual(stubSurveyList);
        expect(axios.post).toHaveBeenCalledTimes(1);
        done();
      });
  });
});
