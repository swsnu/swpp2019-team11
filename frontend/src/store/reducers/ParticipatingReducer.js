import * as actionTypes from '../actions/actionTypes';

const initialState = {
  survey_list: [],
  participated_list : []
};

const ParticipatingReducer = (state = initialState, action = actionTypes.DEFAULT) => {
  switch (action.type) {
    case actionTypes.GET_PARTICIPATING_LIST:
      return { ...state, survey_list: action.target };
    case actionTypes.GET_PARTICIPATED_LIST:
      return { ...state, participated_list: action.target}
    default:
      break;
  }
  return { ...state };
};

export default ParticipatingReducer;
