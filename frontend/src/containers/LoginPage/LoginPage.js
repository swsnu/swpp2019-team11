import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Form, Grid, Header, Segment, Message,
} from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import * as actionCreators from '../../store/actions/index';
import './LoginPage.css';

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
      <Grid className="login" id="login" textAlign="center">
        <Grid.Row id="firstrow" className="firstRow" style={{ height: '175px' }} columns={0}>
          <div>{' '}</div>
        </Grid.Row>
        <Grid.Row id="secondRow" style={{ height: 'calc(100vh - 190px)' }} verticalAlign="middle">
          <Grid.Column id="rowColumn" style={{ maxWidth: 450, minWidth: 300 }}>
            <Header id="surBing" style={{ fontSize: '4em' }} as="h1" textAlign="center">
            surBing
            </Header>
            <Form size="large">
              <Segment stacked id="loginStack">
                <Form.Input
                  className="UserName"
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
                <Button id="loginbutton" className="loginbutton" disabled={!this.state.username || !this.state.password} onClick={() => this.loginHandler()} fluid size="large">
              Log In
                </Button>
              </Segment>
            </Form>
            <Message>
        New to us?
              {' '}
              <NavLink to="/signup" exact>
                {'  '}
Sign Up
              </NavLink>
            </Message>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row id="thirdrow" style={{ height: 175 }} columns={0}>
          <div>{' '}</div>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect(null, mapDispatchToProps)(withRouter(LoginPage));
