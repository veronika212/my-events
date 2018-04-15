/**
 * Action types
 */
const FETCH_USERS = 'FETCH_USERS';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';

/**
 * Action creators
 */
const fetchUsers = () => {
  return {
    type: FETCH_USERS,
  };
};

/**
 * Models
 */
type User = {
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
};

/**
 * Reducers
 */
export const usersReducer = (state: User[] = [], action: any) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return state;
    case FETCH_USERS_FAIL:
      return state;
    default:
      return state;
  }
};

/**
 * Sagas
 */
