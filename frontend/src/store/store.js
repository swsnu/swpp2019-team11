import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import SurveyListReducer from './reducers/SurveyListReducer';
import SurveyReducer from './reducers/SurveyReducer';
import UserReducer from './reducers/UserReducer';
import CartReducer from './reducers/CartReducer';

const rootReducer = combineReducers({
  us: UserReducer,
  sv: SurveyReducer,
  svl: SurveyListReducer,
  ct: CartReducer,
});

const logger = () => (next) => (action) => {
  // console.log('[Middleware] Dispatching', action);
  const result = next(action);
  // console.log('[Middleware] Next State', store.getState());
  return result;
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)));

export default store;
