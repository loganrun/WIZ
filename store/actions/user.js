import { NEW_USER, NEW_USER_ERROR, STORE_PROFILE_NAME } from './types';

export const newUser = (user) => (dispatch) => {
  dispatch({
    type: NEW_USER,
    payload: user,
  });
};

export const newUserError = (error) => (dispatch) => {
  dispatch({
    type: NEW_USER_ERROR,
    payload: error,
  });
};

export const storeProfileName = (name) => (dispatch) => {
  dispatch({
    type: STORE_PROFILE_NAME,
    payload: name,
  });
};
