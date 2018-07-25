import { LOGIN, LOGOUT, GET_LOGGED_USER } from '../actions/types';
import axios from 'axios';

const initialState = {
  loginPending: false,
  pending: false,
  token: null,
  expired_at: null,
  data: {},
  loggedIn: false,
  loginError: null,
  error: false
};

export default function (state = initialState, action) {
  const nextState = { ...state };
  switch (action.type) {
    case LOGIN.REQUEST:
      axios.defaults.headers.common[ 'Authorization' ] = null;
      return {
        ...state,
        loginError: null,
        loginPending: true,
      };

    case LOGIN.SUCCESS:
      const token = action.payload.token;
      axios.defaults.headers.common[ 'Authorization' ] = `Bearer ${token}`;
      const loggedIn = !!token;
      return {
        ...state,
        loginPending: false,
        token,
        expired_at: action.payload.expired_at,
        loggedIn
      };

    case LOGIN.ERROR:
      return {
        ...state,
        loginPending: false,
        loggedIn: false,
        loginError: action.payload
      };

    case GET_LOGGED_USER.REQUEST:
      return {
        ...state,
        error: null,
        pending: true,
        data: {},
      };

    case GET_LOGGED_USER.SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload.data.result
      };

    case GET_LOGGED_USER.ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload
      };

    case LOGOUT:
      return {
        ...state,
        token: null,
        loggedIn: false,
      };

    default:
      return nextState;
  }
}