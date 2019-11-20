
import { INITIAL_LOCATION, INITIAL_LOCATION_ERROR } from "../actions/types";
const initialState = {
  initlocation: {},
  error: null
};

export default function(state = initialState, action) {
  //console.log(action)
    const { type, payload } = action;
  switch (type) {
    case INITIAL_LOCATION:
        //console.log(payload.coords)
        const loc = payload.coords
      return { ...state, initlocation: {...state.initlocation, loc} };
    case INITIAL_LOCATION_ERROR:
      return { ...state, error: {...state.error, payload} };
    default:
      return state;
  }
}