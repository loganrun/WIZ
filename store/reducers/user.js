import { NEW_USER, NEW_USER_ERROR, STORE_PROFILE_NAME } from '../actions/types';

const initialState = {
  newUser: false,
  profileName: '',
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case NEW_USER:
      return { ...state, newUser: { ...state.newUser, payload } };
    case NEW_USER_ERROR:
      return { ...state, error: { ...state.error, payload } };
    case STORE_PROFILE_NAME:
      return { ...state, profileName: payload };
    default:
      return state;
  }
};
