import store from "../store";
import { setLoadingDispatch } from "../actions";

export const setLoadingStateToStore = loading => {
  store.dispatch(setLoadingDispatch(loading));
};
