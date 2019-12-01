import * as actionTypes from '../actions/actionTypes';

const initialState = {
  username: '',
  email: '',
};

const UserReducer = (state = initialState, action = actionTypes.DEFAULT) => {
  if (action === actionTypes.GET_USER) {
    return {
      ...state,
      username: action.target.username,
      email: action.target.email,
    };
  }
  else if (action === actionTypes.ADD_POINT) {
    return { ...state };
  }
  return { ...state };
};

export default UserReducer;
