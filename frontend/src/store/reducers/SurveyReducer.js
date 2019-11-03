import * as actionTypes from '../actions/actionTypes';

const initialState = {
  title: '',
  date: '',
  author_name: '',
  content: '',
  response_count: '',
  item_list: [],
};


const SurveyReducer = (state = initialState, action = actionTypes.DEFALUT) => {
  let survey;
  switch (action.type) {
    case actionTypes.GET_SURVEY:
    case actionTypes.EDIT_SURVEY:
    case actionTypes.DELETE_SURVEY:
      return {
        ...state,
        title: action.target.title,
        date: action.target.date,
        author_name: action.target.author_name,
        content: action.target.content,
        response_count: action.target.response_count,
        item_list: action.target.item_list,
      };
    case actionTypes.ADD_SURVEY:
      survey = {
        title: action.target.title,
        date: action.target.date,
        author_name: action.target.author_name,
        content: action.target.content,
        response_count: action.target.response_count,
        item_list: action.target.item_list,
      };
      return { ...state, ...survey };
    default:
      break;
  }
  return { ...state };
};

export default SurveyReducer;
