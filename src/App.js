import React from 'react';
import LoginPage from './containers/LoginPage/LoginPage'
import SignupPage from './containers/SignupPage/SignupPage'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/login' component = {LoginPage} />
          <Route path = '/signup' component = {SignupPage}/>
          <Redirect exact from='/' to = '/login'/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
