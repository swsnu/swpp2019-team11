import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getItems_ = (item) => {
    return { type: actionTypes.GET_SURVEY, target: item}
};

export const getItems = (id) => {
    return dispatch => {
        return axios.get('/api/surveys/' + id)
            .then(res => {
                dispatch(getItems_(res.data))
            });
    };
};
