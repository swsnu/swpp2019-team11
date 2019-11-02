import * as actionTypes from '../actions/actionTypes';

const initialState = {
  survey_list: [],
  ml_result: [],
};


const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CART:
      return { ...state, survey_list: action.target };
    
    case actionTypes.DELETE_CART:
      return { ...state,
        survey_list: state.survey_list.filter(
          (survey) => (action.target.indexOf(survey.id) === -1)
        )
      }

    case actionTypes.GET_ML:
      return { ...state, ml_result: action.target };
    
    default:
      break;
  }
  return { ...state };
};

export default CartReducer;
