import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Grid, Header,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProfileButton from '../../components/ProfileButton/ProfileButton';
import * as actionCreators from '../../store/actions/index';
import './MainPage.css';

export class MainPage extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }

  addSurveyHandler = () => {
    this.props.history.push('/making');
  }

  participateHandler = () => {
    this.props.history.push('/participate');
  }

  render() {
    return (
      <Grid className="MainPage" textAlign="center">
        <Grid.Row id="firstRow" textAlign="right" colums={1}>
          <Grid.Column>
            <ProfileButton style={{ margin: '25px' }} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row id="secondRow" columns={2} style={{ height: 'calc(100vh - 320px)' }} verticalAlign="middle">
          <Grid.Column>
            <Header id="surBing" style={{ 'font-size': '6em', cursor: 'pointer' }} textAlign="center">
              surBing
            </Header>
            <SearchBar size="huge" id="searchbar" className="Search" />
            <br />
            <br />
            <button className="AddSurveyButton" size="big" onClick={() => this.addSurveyHandler()}>Add New Survey</button>
            <button className="ParticipateButton" size="big" onClick={() => this.participateHandler()}>Participate On Surveys</button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row id="thirdRow">
          <div id="aboutus">
            {' '}
            {'< About Us >'}
            {' '}
          </div>
          <div id="dev">
            <div>Ko Jihyung</div>
            <div>Kim Donghyun</div>
            <div>Jang Minseok</div>
            <div>Cho Minjeong</div>
          </div>
          <div id="team11">swpp2019-team11: surBing</div>
        </Grid.Row>
      </Grid>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  getUserInfo: () => dispatch(actionCreators.getUserInfo()),
});

export default connect(null, mapDispatchToProps)(withRouter(MainPage));
