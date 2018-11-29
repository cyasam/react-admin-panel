import store from "../store";
import { loadSnackbarDispatch } from "../actions";

export const setLoadSnackToStore = error => {
  const { open, message } = error;
  const snackbarProps = {
    open,
    message,
    variant: "error"
  };
  store.dispatch(loadSnackbarDispatch(snackbarProps));
};
