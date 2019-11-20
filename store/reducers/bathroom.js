import { LOAD_BATHROOMS, LOAD_BATHROOMS_ERROR } from "../actions/types";

const initialState = {
  bathrooms: {},
  error: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_BATHROOMS:
      return { ...state, bathrooms: { ...state.bathrooms, payload } };
    case LOAD_BATHROOMS_ERROR:
      return { ...state, error: { ...state.error, payload } };
    default:
      return state;
  }
}