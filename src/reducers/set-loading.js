const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'APP_LOADING':
      return action.payload;
    default:
      return state;
  }
};
