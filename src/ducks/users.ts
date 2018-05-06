import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { history } from '../index';

/**
 * Action types
 */
const FETCH_USERS = 'FETCH_USERS';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';

const FETCH_USER_DETAIL = 'FETCH_USER_DETAIL';
const FETCH_USER_DETAIL_SUCCESS = 'FETCH_USER_DETAIL_SUCCESS';
const FETCH_USER_DETAIL_FAIL = 'FETCH_USER_DETAIL_FAIL';

const CREATE_USER = 'CREATE_USER';
const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
const CREATE_USER_FAIL = 'CREATE_USER_FAIL';

/**
 * Action creators
 */
export const fetchUsers = () => {
  return {
    type: FETCH_USERS,
  };
};

export const fetchUserDetail = (id: number) => {
  return {
    type: FETCH_USER_DETAIL,
    id,
  };
};

export const createUser = (data: any, callback) => {
  return {
    type: CREATE_USER,
    payload: data,
    callback: callback,
  };
};

/**
 * Models
 */
export interface User {
  id: number;
  image: string;
  county: string;
  userName: string;
  city: string;
  placeOfBirth?: string;
  job?: string;
  favourite: {
    motto?: string;
  };
  age: number;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
}

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

type Event = {
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
};

export interface UserDetailModel {
  id: number;
  image: string;
  county: string;
  userName: string;
  city: string;
  placeOfBirth?: string;
  job?: string;
  favourite: {
    book?: string;
    song?: string;
    motto?: string;
    film?: string;
  };
  going?: number[];
  interested?: number[];
  likes?: number[];
  age: number;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  comments: Comment[];
  events: Event[];
}

/**
 * Reducers
 */
export const usersReducer = (state: User[] = [], action: any) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return action.payload;
    case FETCH_USERS_FAIL:
      return action.payload.data;
    case CREATE_USER_SUCCESS:
      return [...state, action.payload];
    default:
      return state;
  }
};

const defaultUserDetailReducer = {
  id: 0,
  image: '',
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
  going: null,
  interested: null,
  likes: null,
  age: 0,
  createdAt: '',
  updatedAt: null,
  deletedAt: null,
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
  events: [
    {
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
    },
  ],
};

export const userDetailReducer = (
  state: UserDetailModel = defaultUserDetailReducer,
  action: any
) => {
  switch (action.type) {
    case FETCH_USER_DETAIL_SUCCESS:
      return action.payload;
    case FETCH_USER_DETAIL_FAIL:
      return action.payload.data;
    default:
      return state;
  }
};

/**
 * Sagas
 */
function* fetchUsersSaga(action: { type: string }) {
  try {
    const resp = yield call(axios.get, 'http://localhost:3011/users');

    yield put({
      type: FETCH_USERS_SUCCESS,
      payload: resp.data,
    });
  } catch (error) {
    yield put({
      type: FETCH_USERS_FAIL,
      payload: [],
    });
  }
}

function* fetchUserDetailSaga(action: { type: string; id: number }) {
  try {
    const resp = yield call(
      axios.get,
      `http://localhost:3011/users/${action.id}?_embed=events&_embed=comments`
    );

    yield put({
      type: FETCH_USER_DETAIL_SUCCESS,
      payload: resp.data,
    });
  } catch (error) {
    yield put({
      type: FETCH_USER_DETAIL_FAIL,
      payload: error,
    });
  }
}

function* doCreateUserSaga(action: any) {
  action.payload.image = 'http://lorempixel.com/35/35/people';

  action.payload.going = 0;
  action.payload.likes = 0;
  action.payload.interested = 0;

  action.payload.createdAt = '2018-04-15T21:18:49.068+02:00';
  action.payload.updatedAt = null;
  action.payload.deletedAt = null;

  console.log(action.payload);
  const resp = yield call(axios.post, `http://localhost:3011/users/`, action.payload);
  console.log(resp);
  if (resp.status !== 201) {
    return yield put({
      type: CREATE_USER_FAIL,
      payload: [],
    });
  }
  yield put({
    type: CREATE_USER_SUCCESS,
    payload: resp.data,
  });

  history.push('/users');
}

export default function* saga() {
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
  yield takeLatest(FETCH_USER_DETAIL, fetchUserDetailSaga);
  yield takeLatest(CREATE_USER, doCreateUserSaga);
}
