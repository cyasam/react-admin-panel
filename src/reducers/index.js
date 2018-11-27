import { combineReducers } from "redux";

import isAuth from "./set-auth";
import loading from "./set-loading";

export default combineReducers({
  isAuth,
  loading
})