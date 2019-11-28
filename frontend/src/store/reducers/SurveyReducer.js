import * as actionTypes from '../actions/actionTypes';

const initialState = {
  survey: {
    item: [],
  },
  ongoing_survey: '',
};


const SurveyReducer = (state = initialState, action = actionTypes.DEFAULT) => {
  switch (action.type) {
    case actionTypes.GET_SURVEY:
    case actionTypes.EDIT_SURVEY:
    case actionTypes.DELETE_SURVEY:
    case actionTypes.GET_ONGOING_SURVEY:
      return { ...state, ongoing_survey: action.target };
    case actionTypes.ADD_ONGOING_SURVEY:
      return { ...state };
    default:
      break;
  }
  return { ...state };
};

export default SurveyReducer;
