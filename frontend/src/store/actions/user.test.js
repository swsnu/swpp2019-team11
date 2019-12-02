import axios from 'axios';
import * as actionCreators from './user';
import store from '../store';

describe('ActionCreators', () => {
  const stubUser = {
    username: '',
    email: '',
    info: {
      point: '',
      username: '',
    },
  };
  it('should login', (done) => {
    axios.post = jest.fn(() => new Promise((res) => {
      const result = { ststus: 200, data: stubUser };
      res(result);
    }));
    store.dispatch(actionCreators.logIn())
      .then(() => {
        const newState = store.getState();
        expect(newState.us).toEqual(stubUser);
        expect(axios.post).toHaveBeenCalledTimes(1);
        done();
      });
  });
  it('should logout', (done) => {
    axios.get = jest.fn(() => new Promise((res) => {
      const result = { ststus: 200, data: stubUser };
      res(result);
    }));
    store.dispatch(actionCreators.logOut())
      .then(() => {
        const newState = store.getState();
        expect(newState.us).toEqual(stubUser);
        expect(axios.get).toHaveBeenCalledTimes(1);
        done();
      });
  });
  it('should signup', (done) => {
    axios.post = jest.fn(() => new Promise((res) => {
      const result = { ststus: 200, data: stubUser };
      res(result);
    }));
    store.dispatch(actionCreators.signUp())
      .then(() => {
        const newState = store.getState();
        expect(newState.us).toEqual(stubUser);
        expect(axios.post).toHaveBeenCalledTimes(1);
        done();
      });
  });
  it('should checkLogin', (done) => {
    axios.get = jest.fn(() => new Promise((res) => {
      const result = { ststus: 200, data: stubUser };
      res(result);
    }));
    store.dispatch(actionCreators.checklogIn())
      .then(() => {
        const newState = store.getState();
        expect(newState.us).toEqual(stubUser);
        expect(axios.get).toHaveBeenCalledTimes(1);
        done();
      });
  });
});
