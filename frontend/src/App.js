import React from 'react';
import {
  Route, Redirect, Switch,
} from 'react-router-dom';
import LoginPage from './containers/LoginPage/LoginPage';
import SignupPage from './containers/SignupPage/SignupPage';
import MainPage from './containers/MainPage/MainPage';
import SearchResultPage from './containers/SearchResultPage/SearchResultPage';
import CartPage from './containers/CartPage/CartPage';
import SurveyDetailPage from './containers/SurveyDetailPage/SurveyDetailPage';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import UploadPage from './containers/UploadPage/UploadPage';

function App(props) {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/signup" exact component={SignupPage} />
        <Route path="/main" exact component={MainPage} />
        <Route path="/search" exact component={SearchResultPage} />
        <Route path="/survey/:id" exact component={SurveyDetailPage} />
        <Route path="/mycart" exact component={CartPage} />
        <Route path="/upload" exact component={UploadPage} />
        <Redirect exact from="/" to="/login" />
      </Switch>
    </div>
  );
}

export default App;
