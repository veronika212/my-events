import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

/**
 * Action types
 */
const FETCH_USERS = 'FETCH_USERS';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
const FETCH_USER_DETAIL = 'FETCH_USER_DETAIL';
const FETCH_USER_DETAIL_SUCCES = 'FETCH_USER_DETAIL_SUCCES';
const FETCH_USER_DETAIL_FAIL = 'FETCH_USER_DETAIL_FAIL';

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
};

export const userDetailReducer = (
  state: UserDetailModel = defaultUserDetailReducer,
  action: any
) => {
  switch (action.type) {
    case FETCH_USER_DETAIL_SUCCES:
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
    const resp = yield call(axios.get, `http://localhost:3011/users/${action.id}`);

    yield put({
      type: FETCH_USER_DETAIL_SUCCES,
      payload: resp.data,
    });
  } catch (error) {
    yield put({
      type: FETCH_USER_DETAIL_FAIL,
      payload: error,
    });
  }
}

export default function* saga() {
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
  yield takeLatest(FETCH_USER_DETAIL, fetchUserDetailSaga);
}
