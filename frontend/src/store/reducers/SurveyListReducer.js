import * as actionTypes from '../actions/actionTypes';

const initialState = {
  survey_list: [

  ],
  ongoing_survey_list: [

  ],
};


const SurveyListReducer = (state = initialState, action = actionTypes.DEFAULT) => {
  switch (action.type) {
    case actionTypes.GET_SURVEY_LIST:
      return { ...state, survey_list: action.target };
    case actionTypes.GET_MY_ONGOING_SURVEYS:
      return { ...state, ongoing_survey_list: action.target };
    case actionTypes.GET_PARTICIPATING_LIST:
      return { ...state, ongoing_survey_list: action.target };
    case actionTypes.CLEAR_PARTICIPATING_LIST:
      return { ...state, ongoing_survey_list: [], survey_list: [] };
    default:
      break;
  }
  return { ...state };
};

export default SurveyListReducer;
