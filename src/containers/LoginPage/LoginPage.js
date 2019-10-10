import React, {Component} from 'react'
import {Button, Form, Grid, Header, Segment, Message} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'


class LoginPage extends Component {

  state = {
    email: '',
    password: '',
  }

  loginHandler = () => {
    alert(this.state.email)
  };


    render(){
      return(
        <Grid textAlign='center' columns={2} divided>
          <Grid.Row style = {{height: '100vh'}} verticalAlign = 'middle'>
          <Grid.Column style={{ maxWidth: 450 , minWidth: 300}}  >
            <Header style = {{'font-size': '4`em'}} as='h1' color='teal' textAlign='center'>
            surBing
            </Header>
          <Form size='large'>
            <Segment stacked>
            <Form.Input onChange = {(event)=> this.setState({email: event.target.value})} value={this.state.email} fluid icon='user' iconPosition='left' placeholder='E-mail address'/>
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value = {this.state.password}
              onChange = {(event)=> this.setState({password: event.target.value})}
            />
            <Button onClick = {() => this.loginHandler()} color='teal' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
        New to us? <NavLink to='/signup' exact>Sign Up</NavLink>
        </Message>
        </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }




}


export default LoginPage