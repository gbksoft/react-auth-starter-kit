import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import Loader from '../common/Loader';
import { login } from '../../actions/login';
import './login.css';


class Login extends React.Component {
  onFormSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;
    this.props.login({ username, password });
  };

  render() {
    const { loggedIn, loginPending, loginError } = this.props.loggedUser;
    const { from } = this.props.location.state || { from: { pathname: '/admin' } };

    if (loggedIn) {
      return <Redirect to={from}/>;
    }

    return (
      <section className="login-form">
        <Form onSubmit={this.onFormSubmit}>
          {loginPending && <Loader/>}
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Please sign in
          </h1>
          {loginError &&
          <Alert color="danger">
            <small>{loginError.message}</small>
          </Alert>}
          <FormGroup>
            <Input type="text" name="username" placeholder="Login" required/>
          </FormGroup>
          <FormGroup>
            <Input type="password" name="password" placeholder="Password" required/>
          </FormGroup>
          <FormGroup className="text-center">
            <Button color="primary">Sign in</Button>
          </FormGroup>
        </Form>
      </section>
    );
  }
}

function mapStateToProps({ loggedUser }) {
  return {
    loggedUser
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
