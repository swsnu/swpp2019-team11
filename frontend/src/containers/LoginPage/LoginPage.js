import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Form, Grid, Header, Segment, Message,
} from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import * as actionCreators from '../../store/actions/index';

export const mapDispatchToProps = (dispatch) => ({
  logIn: (username, password) => dispatch(actionCreators.logIn(username, password)),
});

export class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  loginHandler = () => {
    this.props.logIn(this.state.username, this.state.password)
      .then(() => { this.props.history.push('/main'); })
      .catch(() => {});
  };

  render() {
    return (
      <Grid className="login" textAlign="center" columns={2} divided >
        <Grid.Row style={{ height: '100vh' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450, minWidth: 300 }} >
            <Header style={{ 'fontSize': '4em' }} as="h1" color="teal" textAlign="center">
            surBing
            </Header>
            <Form size="large" >
              <Segment stacked>
                <Form.Input
                  className = "UserName"
                  onChange={(event) => this.setState({ username: event.target.value })}
                  value={this.state.username}
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={(event) => this.setState({ password: event.target.value })}
                />
                <Button id = "loginbutton" disabled={!this.state.username || !this.state.password} onClick={() => this.loginHandler()} color="teal" fluid size="large">
              Login
                </Button>
              </Segment>
            </Form>
            <Message>
        New to us?
              {' '}
              <NavLink to="/signup" exact>Sign Up</NavLink>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect (null, mapDispatchToProps)(withRouter(LoginPage));
//export default LoginPage;