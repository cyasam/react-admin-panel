import store from "../store";
import { setAuthDispatch, loadSnackbarDispatch } from "../actions";

export const setErrorStatesToStore = (error) => {
  store.dispatch(setAuthDispatch(false));

  if(error.open){
    const {
      open,
      message
    } = error;
    const snackbarProps = {
      open,
      message,
      variant: "error"
    };
    store.dispatch(loadSnackbarDispatch(snackbarProps));
  }
}