import {combineReducers} from "redux";
import appState from "./appReducer";

export default combineReducers(Object.assign({ appState } ));