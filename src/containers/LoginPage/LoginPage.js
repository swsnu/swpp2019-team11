import React, {Component} from 'react'
import LoginForm from '../../components/LoginPage/LoginForm/LoginForm'
import SignupForm from '../../components/LoginPage/SignupForm/SignupForm'
import {Grid} from 'semantic-ui-react'



class LoginPage extends Component {

  state = {
    
  }




    render(){
      return(
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' colums={2} divided>

          <LoginForm/>
          <SignupForm/>

        </Grid>
      )
    }




}


export default LoginPage