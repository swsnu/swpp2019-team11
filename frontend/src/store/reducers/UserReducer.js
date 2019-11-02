import * as actionTypes from '../actions/actionTypes';

const initialState = {
  username: '',
  email: '',
  password: '',

};


const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      break;
  }
  return { ...state };
};

export default UserReducer;
