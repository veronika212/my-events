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
  address: {
    city: string;
    place: string;
    street: string;
    zipCode: number;
    state: string;
  };
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
function* fetchEventsSaga(action: { type: string; limit?: number }) {
  try {
    const baseURL = 'http://localhost:3011/events';
    const url = action.limit === undefined ? baseURL : `${baseURL}?_limit=${action.limit}`;
    const resp = yield call(axios.get, url);

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

/**
 * Selectors
 */
export const getUpcomingEvents = state => {
  return state.events.data.slice(0, 3);
};

export const getSugestedEvents = state => {
  return state.events.data.slice(4, 7);
};
