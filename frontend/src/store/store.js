import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

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

const logger = (store) => (next) => (action) => {
  console.log('[Middleware] Dispatching', action);
  const result = next(action);
  console.log('[Middleware] Next State', store.getState());
  return result;
};

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
