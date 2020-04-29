import { NEW_USER, NEW_USER_ERROR } from "./types";

export const newUser = user => dispatch => {
  dispatch({
    type: NEW_USER,
    payload: user
  });
};

export const newUserError = error => dispatch => {
  dispatch({
    type: NEW_USER_ERROR,
    payload: error
  });
};