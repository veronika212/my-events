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

export interface Event {
  id: number;
  name: string;
  image: string;
  description: string;
  going?: number;
  likes?: number;
  interested?: number;
  category: string;
  county: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface Filters {
  category: string | null;
  date: string | null;
  county: string | null;
}

export interface EventReducerModel {
  filters: Filters;
  events: Event[];
}

/**
 * Reducer
 */
const defaultState = {
  events: [],
  filters: {
    category: null,
    date: null,
    county: null,
  },
};

export const eventsReducer = (state: EventReducerModel = defaultState, action: any) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: [...action.payload],
      };
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
    const resp = yield call(axios.get, 'http://localhost:3011/events');

    yield put({
      type: FETCH_EVENTS_SUCCESS,
      payload: resp.data,
    });
  } catch (error) {
    yield put({
      type: FETCH_EVENTS_FAIL,
      payload: [],
    });
  }
}

export default function* saga() {
  yield takeLatest(FETCH_EVENTS, fetchEventsSaga);
}
