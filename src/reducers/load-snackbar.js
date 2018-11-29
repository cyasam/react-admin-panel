const initialState = {
  anchorOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  open: false,
  variant: "success",
  autoHideDuration: 3000,
  message: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_SNACKBAR":
      return { ...state, ...action.payload };
    case "CLOSE_SNACKBAR":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
