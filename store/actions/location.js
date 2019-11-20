import { INITIAL_LOCATION, INITIAL_LOCATION_ERROR } from "./types";

export const initialLocation = location => dispatch => {
  dispatch({
    type: INITIAL_LOCATION,
    payload: location
  });
};

export const initialLocationError = error => dispatch => {
  dispatch({
    type: INITIAL_LOCATION_ERROR,
    payload: error
  });
};