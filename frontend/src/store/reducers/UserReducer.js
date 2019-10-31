import * as actionTypes from '../actions/actionTypes';

const initialState = {
  username: '',
  email: '',
  password: '',
  
};


const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SURVEYS:
      return { ...state, survey_list: action.target };
    default:
      break;
  }
  return { ...state };
};

export default UserReducer;
