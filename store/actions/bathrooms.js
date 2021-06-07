import { LOAD_BATHROOMS, LOAD_BATHROOMS_ERROR } from './types';

export const loadBathrooms = (payload, alertType) => (dispatch) => {
  dispatch({
    type: LOAD_BATHROOMS,
    payload: { payload, alertType },
  });
};

export const initialLocationError = (payload, alertType) => (dispatch) => {
  dispatch({
    type: LOAD_BATHROOMS_ERROR,
    payload: { payload, alertType },
  });
};
