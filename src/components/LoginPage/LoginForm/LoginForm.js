import React from 'react'
import {Button, Form, Grid, Header, Segment} from 'semantic-ui-react'


const LoginForm = (props) => {


  return(
   
    <Grid.Column style={{ maxWidth: 450 }} width='8'>
      <Header as='h2' color='teal' textAlign='center'>
        Log-in to your account
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />
          <Button color='teal' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  )
}


export default LoginForm