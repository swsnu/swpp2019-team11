import React from 'react'
import {Button, Form, Grid, Header, Segment} from 'semantic-ui-react'


const SignupForm = (props) => {


  return(
    <Grid.Column style={{ maxWidth: 450 }} width = '8'>
      <Header as='h2' color='teal' textAlign='center'>
        Sign-up to surBing
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='mail outline' iconPosition='left' placeholder='E-mail address' />
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password confirmation'
            type='password'
          />
          <Button color='teal' fluid size='large'>
            Signup
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  )
}


export default SignupForm