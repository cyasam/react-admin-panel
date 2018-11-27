export const setLoading = (loading) => (dispatch) => {
  dispatch({
    type: 'APP_LOADING',
    payload: loading
  }) 
}