import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

/**
 * Action types
 */
const FETCH_USERS = 'FETCH_USERS';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';

/**
 * Action creators
 */
export const fetchUsers = () => {
  return {
    type: FETCH_USERS,
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
    book?: string;
    song?: string;
    motto?: string;
    film?: string;
  };
  going: number[];
  interested: number[];
  likes: number[];
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

export default function* saga() {
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
}
