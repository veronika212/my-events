import { all } from 'redux-saga/effects';

import eventsSaga from '../ducks/events';
import eventDetailSaga from '../ducks/events';
import usersSaga from '../ducks/users';
import userDetailSaga from '../ducks/users';

export default function* rootSaga() {
  yield all([eventsSaga(), eventDetailSaga(), usersSaga(), userDetailSaga()]);
}
