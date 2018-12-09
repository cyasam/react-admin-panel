import { combineReducers } from 'redux';

import isAuth from './set-auth';
import loading from './set-loading';
import snackbar from './load-snackbar';

export default combineReducers({
  isAuth,
  loading,
  snackbar,
});
