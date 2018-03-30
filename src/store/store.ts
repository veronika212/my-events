import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';

import rootSaga from './rootSaga';
import { eventsReducer } from '../ducks/events';

const rootReducer = combineReducers({
  events: eventsReducer,
  // eventDetail: eventDetailReducer,
  // users: usersReducer,
  // userDetail: userDetailReducer,
  form: formReducer,
});

const sagaMiddleware = createSagaMiddleware();
const windowIfDefined = typeof window === 'undefined' ? null : window as any;
const composeEnhancers = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store: any = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(sagaMiddleware, logger)));

sagaMiddleware.run(rootSaga);
