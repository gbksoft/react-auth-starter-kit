import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import App from './components/App';
import Login from './components/auth/Login';
import PrivateRoute from './components/common/PrivateRoute';
import registerServiceWorker from './registerServiceWorker';
import { LOGIN } from './actions/types';
import config from './config';
import 'bootstrap/dist/css/bootstrap.css';

const target = document.querySelector('#root');

const currentLogged = localStorage.getItem('currentLogged');
if (currentLogged) {
  const payload = JSON.parse(currentLogged);
  if (payload.expired_at > Date.now() / 1000) {
    store.dispatch({
      type: LOGIN.SUCCESS,
      payload
    });
  }
}

axios.defaults.baseURL = config.apiUrl;
axios.interceptors.response.use(response => response, error => {
  if (error.response.status === 401) {
    history.push('/admin/auth/login');
    store.dispatch({
      type: LOGIN.ERROR,
      payload: error
    });

  }
  return Promise.reject(error);
});

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route path="/admin/auth/login" component={Login}/>
          <PrivateRoute path="/admin" component={App}/>
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  target
);
registerServiceWorker();
