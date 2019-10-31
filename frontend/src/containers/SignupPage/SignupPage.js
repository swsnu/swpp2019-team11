import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import {
  Button, Form, Grid, Header, Segment, Message,
} from 'semantic-ui-react';

import { NavLink } from 'react-router-dom';

class SignupPage extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
  }


  signupHandler = () => {
    //alert('signed up!');
    if (this.state.password != this.state.password_confirmation) {
      alert("Password Confiramtion is different!");
    }
    //else axios.post('http://localhost:3000/signup/').then(result => alert(result));
    this.props.signUp(this.state.username, this.state.email, this.state.password);
    //this.props.history.push('/login/');
  }

  render() {
    return (
      <Grid textAlign="center" columns={3} divided>
        <Grid.Row style={{ height: '100vh' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450, minWidth: 300 }} width="8">
            <Header as="h1" color="teal" textAlign="center">
          Sign-up
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input fluid icon="mail outline" iconPosition="left" placeholder="E-mail address" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                <Form.Input fluid icon="user" iconPosition="left" placeholder="Username" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password confirmation"
                  type="password"
                  value={this.state.password_confirmation}
                  onChange={(e) => this.setState({ password_confirmation: e.target.value })}
                />
                <Button color="teal" fluid size="large" onClick={() => this.signupHandler()}>
              Signup
                </Button>
              </Segment>
            </Form>
            <Message>
        Already signed up?
              {' '}
              <NavLink to="/login" exact>Log In</NavLink>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export const mapDispatchToProps = (dispatch) => {
  return {
    signUp : (username, email, password) => dispatch(actionCreators.signup(username, email, password)),
  }
}


export default connect (null, mapDispatchToProps) (SignupPage);
//export default SignupPage;