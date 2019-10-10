import React from 'react';
import LoginPage from './containers/LoginPage/LoginPage'
import SignupPage from './containers/SignupPage/SignupPage'
import MainPage from './containers/MainPage/MainPage'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/login' component = {LoginPage} />
          <Route path = '/signup' component = {SignupPage}/>
          <Route path = '/Main' component = {MainPage}/>
          <Redirect exact from='/' to = '/login'/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
