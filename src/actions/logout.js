import { LOGOUT } from './types';

export default function logout() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT
    });
    localStorage.removeItem('currentLogged');
  }
}