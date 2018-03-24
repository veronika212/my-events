import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

/**
 * Action types
 */
const FETCH_EVENTS = 'FETCH_EVENTS';
const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
const FETCH_EVENTS_FAIL = 'FETCH_EVENTS_FAIL';

/**
 * Action creators
 */
export const fetchEvents = () => {
  return {
    type: FETCH_EVENTS,
  };
};

/**
 * Reducer
 */
export const eventsReducer = (state = [], action: any) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return [...action.payload];
    case FETCH_EVENTS_FAIL:
      return action.payload.data;
    default:
      return state;
  }
};

/**
 * Sagas
 */
function* fetchEventsSaga() {
  try {
    const resp = yield call(axios.get, 'http://localhost:3001/events');

    yield put({
      type: FETCH_EVENTS_SUCCESS,
      payload: resp.data,
    });
  } catch (error) {
    yield put({
      type: FETCH_EVENTS_FAIL,
      payload: error,
    });
  }
}

export default function* saga() {
  yield takeLatest(FETCH_EVENTS, fetchEventsSaga);
}