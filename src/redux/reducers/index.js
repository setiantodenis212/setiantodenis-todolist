import { combineReducers } from "redux";
import activity from "./activityReducer";
import display from "./displayReducer";

export default combineReducers({ activity, display });
