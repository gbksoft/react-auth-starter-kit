import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, loggedUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedUser.loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/admin/auth/login'
          }}
        />
      )
    }
  />
);

function mapStateToProps({loggedUser}) {
  return {
    loggedUser
  };
}

export default connect(mapStateToProps)(PrivateRoute);
