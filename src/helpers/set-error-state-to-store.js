import store from "../store";
import { setAuthDispatch, loadSnackbarDispatch } from "../actions";

export const setErrorStatesToStore = (error) => {
  store.dispatch(setAuthDispatch(false));

  const {
    message
  } = error;

  const snackbarProps = {
    open: true,
    message,
    variant: "error"
  };
  store.dispatch(loadSnackbarDispatch(snackbarProps));
}