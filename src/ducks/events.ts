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
export const fetchEvents = (limit?: number) => {
  return {
    type: FETCH_EVENTS,
    limit,
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
  category?: string;
  date?: string;
  county?: string;
}

export interface EventReducerModel {
  filters: Filters;
  data: Event[];
}

/**
 * Reducer
 */
const defaultState = {
  data: [],
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
        data: [...action.payload],
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
function* fetchEventsSaga(action: { type: string; limit: number }) {
  try {
    const resp = yield call(axios.get, `http://localhost:3011/events?_limit=${action.limit}`);

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
