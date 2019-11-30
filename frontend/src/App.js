import React from 'react';
import {
  Route, Redirect, Switch,
} from 'react-router-dom';
import LoginPage from './containers/LoginPage/LoginPage';
import SignupPage from './containers/SignupPage/SignupPage';
import MainPage from './containers/MainPage/MainPage';
import SearchResultPage from './containers/SearchResultPage/SearchResultPage';
import SurveyDetailPage from './containers/SurveyDetailPage/SurveyDetailPage';
import MyPage from './containers/MyPage/MyPage';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import SurveyParticipate from './containers/SurveyParticipate/SurveyParticipate';
import MakingPage from './containers/MakingPage/MakingPage';
import ResponsePage from './containers/ResponsePage/ResponsePage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/signup" exact component={SignupPage} />
        <Route path="/main" exact component={MainPage} />
        <Route path="/search" exact component={SearchResultPage} />
        <Route path="/survey/:id" exact component={SurveyDetailPage} />
        <Route path="/participate" exact component={SurveyParticipate} />
        <Route path="/mypage" exact component={MyPage} />
        <Route path="/making" exact component={MakingPage} />
        <Route path="/participate/:id" exact component={ResponsePage} />
        <Redirect exact from="/" to="/login" />
      </Switch>
    </div>
  );
}

export default App;
