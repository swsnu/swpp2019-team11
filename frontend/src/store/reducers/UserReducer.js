import * as actionTypes from '../actions/actionTypes';

const initialState = {
  username: '',
  email: '',
};

const UserReducer = (state = initialState, action = actionTypes.DEFAULT) => {
  if(action === actionTypes.GET_USER){
    return {
      username: action.target.username,
      email: action.target.email,
    };
  }
  return { ...state };
};

export default UserReducer;
