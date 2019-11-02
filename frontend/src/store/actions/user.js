import * as actionTypes from './actionTypes';
import axios from 'axios';
const signUp_ = (res) => {
    return {type: actionTypes.SIGNUP};
};
export const signUp = (username, email, password) => {
    var user = {
        'username' : username,
        'email' : email,
        'password' : password
    }
    return dispatch => {
        return axios.post('/api/signup/', user)
            .then(res => {
                dispatch(signUp_(res.status));
                return res;
            })
    }
};

const logIn_ = (res) => {
    return {type: actionTypes.LOGIN};
}
export const logIn = (username, password) => {
    const user = { 'username': username, 'password': password };
    return (dispatch) => {
        return axios.post('/api/login/', user)
            .then((res) =>  {
                dispatch(logIn_(res.status));
                return res;
            });
    }
}

const logOut_ = () => {
    return {type: actionTypes.LOGOUT};
}
export const logOut = () => {
    return (dispatch) => {
        return axios.get('/api/logout/')
            .then((res) => {
                dispatch(logOut_());
            });
    }
}