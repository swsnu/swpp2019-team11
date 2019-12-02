import * as actionTypes from '../actions/actionTypes';

const initialState = {
  username: '',
  email: '',
  point: '',
};

const UserReducer = (state = initialState, action = actionTypes.DEFAULT) => {
  if (action === actionTypes.GET_USER) {
    return {
      ...state,
      username: action.target.username,
      email: action.target.email,
    };
  }
  if (action === actionTypes.ADD_POINT) {
    return { ...state };
  }
  if (action === actionTypes.GET_USER_INFO){
    return {
      ...state,
      point: action.target.point,
    };
  }
  return { ...state };
};

export default UserReducer;
