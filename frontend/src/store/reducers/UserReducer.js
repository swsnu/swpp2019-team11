// import * as actionTypes from '../actions/actionTypes';

const initialState = {
  username: '',
  email: '',
  password: '',

};


const UserReducer = (state = initialState, action = actionTypes.DEFALUT) => {
  return { ...state };
};

export default UserReducer;
