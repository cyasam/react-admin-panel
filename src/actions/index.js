export const setAuth = (isAuth) => (dispatch) => {
  dispatch({
    type: 'APP_AUTH',
    payload: isAuth
  }) 
}

export const setLoading = (loading) => (dispatch) => {
  dispatch({
    type: 'APP_LOADING',
    payload: loading
  }) 
}