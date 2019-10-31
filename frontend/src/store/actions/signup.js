import * as actionTypes from './actionTypes';
import axios from 'axios';
export const signup_ = (res) => {
    //if (res.status == 200) alert("signed up"); modify this. 
    return {type: actionTypes.SIGNUP};
};
export const signup = (username, email, password) => {
    var user = {
        'username' : username,
        'email' : email,
        'password' : password
    }
    return dispatch => {
        return axios.post('/api/signup/', user)
            .then(res => {
                dispatch(signup_(res.data));
            })
    }
};