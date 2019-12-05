import * as actionTypes from '../actions/actionTypes';

const initialState = {
  username: '',
  email: '',
  info: {
    username: '', point: '', age: null, gender: null,
  },
};

const UserReducer = (state = initialState, action = actionTypes.DEFAULT) => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return {
        ...state,
        username: action.target.username,
        email: action.target.email,
      };
    case actionTypes.ADD_POINT:
      return { ...state };
    case actionTypes.GET_USER_INFO:
      return {
        ...state,
        info: action.target,
      };
    default:
      break;
  }
  return { ...state };
};

export default UserReducer;
