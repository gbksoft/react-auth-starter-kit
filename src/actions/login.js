import { LOGIN } from './types';
import axios from 'axios';
import get from 'lodash/get';

export function login(data, url = '/users/login') {
  return dispatch => {
    dispatch({
      type: LOGIN.REQUEST
    });

    axios.post(url, data)
      .then(function (response) {
        dispatch({
          type: LOGIN.SUCCESS,
          payload: response.data.result
        });
        localStorage.setItem('currentLogged', JSON.stringify(response.data.result));
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.result.token}`;

      })
      .catch(function (error) {
        const message = get(error, 'response.data.result[0].message', error.message);
        dispatch({
          type: LOGIN.ERROR,
          payload: { message },
          error: true
        });
      });
  };
}

export function singUp(data) {
  return axios.post('/users/signup', data);
}