import React, { Component } from 'react';
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
    alert('signed up!');
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
                <Button color="teal" fluid size="large">
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


export default SignupPage;
