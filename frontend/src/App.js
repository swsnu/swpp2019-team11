import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import LoginPage from './containers/LoginPage/LoginPage';
import SignupPage from './containers/SignupPage/SignupPage';
import MainPage from './containers/MainPage/MainPage';
import SearchResultPage from './containers/SearchResultPage/SearchResultPage';
import CartPage from './containers/CartPage/CartPage';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import UploadPage from './containers/UploadPage/UploadPage';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/main" component={MainPage} />
          <Route path="/search" component={SearchResultPage} />
          <Route path="/mycart" component={CartPage} />
          <Route path="/upload" component={UploadPage} />
          <Redirect exact from="/" to="/login" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
