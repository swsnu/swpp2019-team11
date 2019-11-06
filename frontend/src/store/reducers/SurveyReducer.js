import * as actionTypes from '../actions/actionTypes';

const initialState = {
  survey: {
    item: []
  },
};


const SurveyReducer = (state = initialState, action = actionTypes.DEFAULT) => {
  switch (action.type) {
    case actionTypes.GET_SURVEY:
    case actionTypes.EDIT_SURVEY:
    case actionTypes.DELETE_SURVEY:
    case actionTypes.ADD_SURVEY:
      return {
        survey: action.target,
      };
    default:
      break;
  }
  return { ...state };
};

export default SurveyReducer;