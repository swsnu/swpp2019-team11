import * as actionTypes from '../actions/actionTypes';

const initialState = {
  title: '',
  author: '',
  upload_date: '',
  survey_start_date: '',
  survey_end_date: '',
  content: '',
  respondant_count: 0,
  item: [],
};


const SurveyReducer = (state = initialState, action = actionTypes.DEFAULT) => {
  switch (action.type) {
    case actionTypes.GET_SURVEY:
      return {
        title: action.target.title,
        author: action.target.author,
        upload_date: action.target.upload_date,
        survey_start_date: action.target.survey_start_date,
        survey_end_date: action.target.survey_end_date,
        content: action.target.content,
        respondant_count: action.target.respondant_count,
        item: action.target.item,
      };
    case actionTypes.EDIT_SURVEY:
    case actionTypes.DELETE_SURVEY:
    case actionTypes.ADD_SURVEY:
      return { ...state };
    default:
      break;
  }
  return { ...state };
};

export default SurveyReducer;
