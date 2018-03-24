import { all } from 'redux-saga/effects';

import eventsSaga from '../ducks/events';

export default function* rootSaga() {
  yield all([
    eventsSaga(),
  ]);
}
