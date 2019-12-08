import * as actionTypes from '../actions/actionTypes';

const initialState = {
  survey_list: [],
};

const ParticipatingReducer = (state = initialState, action = actionTypes.DEFAULT) => {
  switch (action.type) {
    case actionTypes.GET_PARTICIPATING_LIST:
      return { ...state, survey_list: action.target };
    default:
      break;
  }
  return { ...state };
};

export default ParticipatingReducer;
