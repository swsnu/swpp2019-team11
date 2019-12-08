import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';

import SurveyListReducer from './reducers/SurveyListReducer';
import SurveyReducer from './reducers/SurveyReducer';
import UserReducer from './reducers/UserReducer';
import CartReducer from './reducers/CartReducer';
import ParticipatingReducer from './reducers/ParticipatingReducer';

const rootReducer = combineReducers({
  us: UserReducer,
  sv: SurveyReducer,
  svl: SurveyListReducer,
  ct: CartReducer,
  pt: ParticipatingReducer,
});

const logger = () => (next) => (action) => {
  // console.log('[Middleware] Dispatching', action);
  const result = next(action);
  // console.log('[Middleware] Next State', store.getState());
  return result;
};

const store = createStore(rootReducer, compose(applyMiddleware(logger, thunk), window.devToolsExtension ? window.devToolsExtension() : (f) => f));

export default store;
