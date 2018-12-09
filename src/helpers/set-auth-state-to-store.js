import store from '../store';
import { setAuthDispatch } from '../actions';

export const setAuthStateToStore = isAuth => {
  store.dispatch(setAuthDispatch(isAuth));
};
