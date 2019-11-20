import { combineReducers } from "redux";
import location from "./location";
import bathroom from "./bathroom";

export default combineReducers({
  location,
  bathroom
});