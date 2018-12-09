export const setAuthDispatch = isAuth => ({
  type: 'APP_AUTH',
  payload: isAuth,
});

export const setAuth = isAuth => dispatch => {
  dispatch(setAuthDispatch(isAuth));
};

export const setLoadingDispatch = loading => ({
  type: 'APP_LOADING',
  payload: loading,
});

export const setLoading = loading => dispatch => {
  dispatch(setLoadingDispatch(loading));
};

export const loadSnackbarDispatch = props => ({
  type: 'LOAD_SNACKBAR',
  payload: props,
});

export const loadSnackbar = props => dispatch => {
  dispatch(loadSnackbarDispatch(props));
};

export const closeSnackbarDispatch = () => ({
  type: 'CLOSE_SNACKBAR',
  payload: {
    open: false,
  },
});

export const closeSnackbar = () => dispatch => {
  dispatch(closeSnackbarDispatch());
};
