import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"
import { verifyAuth } from "./helpers";

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");

  middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

if(verifyAuth()){
  store.dispatch({
    type: 'APP_AUTH',
    payload: true
  });
}

export default store;