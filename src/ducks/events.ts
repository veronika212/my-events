import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

/**
 * Action types
 */
const FETCH_EVENTS = 'FETCH_EVENTS';
const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
const FETCH_EVENTS_FAIL = 'FETCH_EVENTS_FAIL';

const FETCH_EVENT_DETAIL = 'FETCH_EVENT_DETAIL';
const FETCH_EVENT_DETAIL_SUCCESS = 'FETCH_EVENT_DETAIL_SUCCESS';
const FETCH_EVENT_DETAIL_FAIL = 'FETCH_EVENT_DETAIL_FAIL';

const CREATE_EVENT = 'CREATE_EVENT';
const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
const CREATE_EVENT_FAIL = 'CREATE_EVENT_FAIL';

/**
 * Action creators
 */
export const fetchEvents = (limit?: number) => {
  return {
    type: FETCH_EVENTS,
    limit,
  };
};

export const fetchEventDetail = (id: number) => {
  return {
    type: FETCH_EVENT_DETAIL,
    id,
  };
};

export const createEvent = (data: any) => {
  return {
    type: CREATE_EVENT,
    payload: data,
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

type Comment = {
  id: number;
  eventId: number;
  userId: number;
  title: string;
  text: string;
  author: {
    image: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export interface EventDetailModel {
  id: number;
  name: string;
  image: string;
  description: string;
  going: number;
  likes: number;
  interested: number;
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
  user: {
    id: number;
    county: string;
    userName: string;
    city: string;
    placeOfBirth: string;
    job: string;
    favourite: {
      book: string;
      song: string;
      motto: string;
      film: string;
    };
    going: number;
    interested: number;
    likes: number;
    age: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
  comments: Comment[];
}

const defaultEventDetailReducer = {
  id: 0,
  name: '',
  image: '',
  description: '',
  going: 0,
  likes: 0,
  interested: 0,
  category: '',
  county: '',
  startDate: '',
  endDate: '',
  createdAt: '',
  updatedAt: null,
  deletedAt: null,
  address: {
    city: '',
    place: '',
    street: '',
    zipCode: 0,
    state: '',
  },
  user: {
    id: 0,
    county: '',
    userName: '',
    city: '',
    placeOfBirth: '',
    job: '',
    favourite: {
      book: '',
      song: '',
      motto: '',
      film: '',
    },
    going: 0,
    interested: 0,
    likes: 0,
    age: 0,
    createdAt: '',
    updatedAt: null,
    deletedAt: null,
  },
  comments: [
    {
      id: 0,
      eventId: 0,
      userId: 0,
      title: '',
      text: '',
      author: {
        image: '',
        firstName: '',
        lastName: '',
      },
      createdAt: '',
      updatedAt: null,
      deletedAt: null,
    },
  ],
};

export const eventDetailReducer = (
  state: EventDetailModel = defaultEventDetailReducer,
  action: any
) => {
  switch (action.type) {
    case FETCH_EVENT_DETAIL_SUCCESS:
      return action.payload;
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

function* fetchEventDetailSaga(action: { type: string; id: number }) {
  try {
    const resp = yield call(
      axios.get,
      `http://localhost:3011/events/${action.id}/?_embed=comments&_expand=user`
    );
    yield put({
      type: FETCH_EVENT_DETAIL_SUCCESS,
      payload: resp.data,
    });
  } catch (error) {
    yield put({
      type: FETCH_EVENT_DETAIL_FAIL,
      payload: [],
    });
  }
}

function* doCreateEvent({ type, payload }: { type: string; payload: any }) {
  console.log(payload, 'payload');
  payload.userId = 24;
  payload.image = 'http://lorempixel.com/640/480/people';

  payload.going = 0;
  payload.likes = 0;
  payload.interested = 0;

  payload.startDate = '2018-04-25T21:18:49.067+02:00';
  payload.endDate = '2018-04-28T21:18:49.068+02:00';
  payload.createdAt = '2018-04-15T21:18:49.068+02:00';
  payload.updatedAt = null;
  payload.deletedAt = null;

  const resp = yield call(axios.post, `http://localhost:3011/events/`, payload);
  console.log(resp);
  if (resp.status !== 201) {
    return yield put({
      type: CREATE_EVENT_FAIL,
      payload: [],
    });
  }

  yield put({
    type: CREATE_EVENT_SUCCESS,
    payload,
  });
}

export default function* saga() {
  yield takeLatest(FETCH_EVENTS, fetchEventsSaga);
  yield takeLatest(FETCH_EVENT_DETAIL, fetchEventDetailSaga);
  yield takeLatest(CREATE_EVENT, doCreateEvent);
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
