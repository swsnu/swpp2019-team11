import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Form, Grid, Header, Segment, Message,
} from 'semantic-ui-react';
import './SignupPage.css';
import { NavLink } from 'react-router-dom';
import * as actionCreators from '../../store/actions/index';

export class SignupPage extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    age: '',
    gender: '',
    email_error: false,
    username_error: false,
    password_error: false,
    password_confirmation_error: false,
    age_error: false,
    gender_error: false,
  }

  options = [
    { key: 'm', text: 'Male', value: 'M' },
    { key: 'f', text: 'Female', value: 'F' },
    { key: 'o', text: 'Other', value: 'O' },
  ]

  validate = () => {
    this.setState({
      email_error: (this.state.email == ''),
      username_error: (this.state.username == ''),
      password_error: (this.state.password == ''),
      password_confirmation_error: (this.state.password != this.state.password_confirmation),
      age_error: !!((this.state.age == '' || !Number.isInteger(+this.state.age))),
      gender_error: (this.state.gender == ''),
    });
  }


  signupHandler = () => {
    this.validate();
    if (!this.state.age_error
        && !this.state.email_error
        && !this.state.gender_error
        && !this.state.password_error
        && !this.state.password_confirmation_error) {
      this.props.signUp(this.state.username, this.state.email, this.state.password, this.state.age, this.state.gender)
        .then(() => {
          this.props.history.push('/login');
        });
    }
  }

  render() {
    return (
      <Grid textAlign="center" columns={3} divided>
        <Grid.Row style={{ height: 125 }} id="firstrow">
        </Grid.Row>
        <Grid.Row style={{ height: 'calc(100vh - 80px)' }} id="secondRow" verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450, minWidth: 300 }} width="8">
            <div id="signupForm">
              <Header as="h1" id="surBing" textAlign="center">
          Sign-up
              </Header>
              <Form size="large">
                <Segment id="signupSeg" stacked>
                  <Form.Input className="Email" fluid icon="mail outline" iconPosition="left" placeholder="E-mail address" value={this.state.email} onChange={(e) => { this.state.email = e.target.value; this.validate(); }} error={this.state.email_error} />
                  <Form.Input className="UserName" fluid icon="user" iconPosition="left" placeholder="Username" value={this.state.username} onChange={(e) => { this.state.username = e.target.value; this.validate(); }} error={this.state.username_error} />
                  <Form.Input
                    className="Password"
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    error={this.state.password_error}
                    value={this.state.password}
                    onChange={(e) => { this.state.password = e.target.value; this.validate(); }}
                  />
                  <Form.Input
                    className="PasswordComfirmation"
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password confirmation"
                    type="password"
                    error={this.state.password_confirmation_error}
                    value={this.state.password_confirmation}
                    onChange={(e) => { this.state.password_confirmation = e.target.value; this.validate(); }}
                  />
                  <Form.Group widths="equal">
                    <Form.Input className="ageInput" onChange={(e) => { this.state.age = e.target.value; this.validate(); }} fluid placeholder="Age" error={this.state.age_error} />
                    <Form.Select className="genderInput" options={this.options} onChange={(e, { value }) => { this.state.gender = value; this.validate(); }} placeholder="Gender" error={this.state.gender_error} />
                  </Form.Group>
                  <Button id="signupButton" fluid size="large" onClick={() => this.signupHandler()}>
              Signup
                  </Button>
                </Segment>
              </Form>
            </div>
            <Message>
        Already signed up?
              {' '}
              <NavLink to="/login" exact>Log In</NavLink>
            </Message>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row id="thirdrow">
        </Grid.Row>
      </Grid>
    );
  }
}
export const mapDispatchToProps = (dispatch) => ({
  signUp: (username, email, password, age, gender) => dispatch(actionCreators.signUp(username, email, password, age, gender)),
});


export default connect(null, mapDispatchToProps)(SignupPage);
// export default SignupPage;
