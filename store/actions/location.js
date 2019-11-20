import { INITIAL_LOCATION, INITIAL_LOCATION_ERROR } from "./types";

export const initialLocation = position => dispatch => {
  dispatch({
    type: INITIAL_LOCATION,
    payload: position
  });
};

export const initialLocationError = error => dispatch => {
  dispatch({
    type: INITIAL_LOCATION_ERROR,
    payload: error
  });
};