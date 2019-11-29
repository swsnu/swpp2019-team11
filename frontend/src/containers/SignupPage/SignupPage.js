import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Form, Grid, Header, Segment, Message,
} from 'semantic-ui-react';

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
    email_error : false,
    username_error : false,
    password_error : false,
    password_confirmation_error : false,
    age_error : false,
    gender_error : false,
  }

  options = [
    { key: 'm', text: 'Male', value: 'M' },
    { key: 'f', text: 'Female', value: 'F' },
    { key: 'o', text: 'Other', value: 'O' },
  ]

  validate = () => {
    this.setState({
      email_error : (this.state.email=="")? true : false,
      username_error : (this.state.username=="")? true : false,
      password_error : (this.state.password=="")? true : false,
      password_confirmation_error : (this.state.password !=this.state.password_confirmation)? true : false,
      age_error : (this.state.age==''|| !Number.isInteger(+this.state.age))? true : false,
      gender_error : (this.state.gender=='')? true : false,
    })
  }


  signupHandler = () => {
    this.validate()
    if (!this.state.age_error &&
        !this.state.email_error && 
        !this.state.gender_error &&
        !this.state.password_error &&
        !this.state.password_confirmation_error) {
          this.props.signUp(this.state.username, this.state.email, this.state.password, this.state.age, this.state.gender)
          .then(() => {
            this.props.history.push('/login');
          })
    }
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
                <Form.Input className="Email" fluid icon="mail outline" iconPosition="left" placeholder="E-mail address" value={this.state.email} onChange={(e) => {this.state.email = e.target.value; this.validate()}} error = {this.state.email_error} />
                <Form.Input className="UserName" fluid icon="user" iconPosition="left" placeholder="Username" value={this.state.username} onChange={(e) => {this.state.username = e.target.value; this.validate()}} error = {this.state.username_error} />
                <Form.Input
                  className="Password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  error = {this.state.password_error}
                  value={this.state.password}
                  onChange={(e) => {this.state.password = e.target.value; this.validate()}}
                />
                <Form.Input
                  className="PasswordComfirmation"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password confirmation"
                  type="password"
                  error = {this.state.password_confirmation_error}
                  value={this.state.password_confirmation}
                  onChange={(e) => {this.state.password_confirmation= e.target.value; this.validate()}}
                />
                <Form.Group widths='equal'>
                  <Form.Input onChange={(e) => {this.state.age = e.target.value; this.validate() }} fluid placeholder='Age' error = {this.state.age_error}/>
                  <Form.Select options={this.options} onChange = {(e, {value}) => {this.state.gender = value ; this.validate()}} placeholder='Gender' error = {this.state.gender_error}/>
                </Form.Group>
                <Button id="signupButton" color="teal" fluid size="large" onClick={() => this.signupHandler()}>
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
export const mapDispatchToProps = (dispatch) => ({
  signUp: (username, email, password, age, gender) => dispatch(actionCreators.signUp(username, email, password, age, gender)),
});


export default connect(null, mapDispatchToProps)(SignupPage);
// export default SignupPage;
