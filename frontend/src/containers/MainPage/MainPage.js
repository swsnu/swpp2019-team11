import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProfileButton from '../../components/ProfileButton/ProfileButton';
import * as actionCreators from '../../store/actions/index';

export class MainPage extends Component {
  componentDidMount() {
    // this.props.checklogIn().catch(() => { this.props.history.push('/login/'); });
  }

  addSurveyHandler = () => {
    this.props.history.push('/upload');
  }

  render() {
    return (
      <Grid className="MainPage" textAlign="center">
        <Grid.Row textAlign="right" colums={1}>
          <Grid.Column>
            <ProfileButton style={{ margin: '25px' }} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} style={{ height: '60.3vh' }} verticalAlign="middle">
          <Grid.Column>
            <Header style={{ 'font-size': '4em', cursor: 'pointer' }} size="huge" color="teal" textAlign="center">
              surBing
            </Header>
            <SearchBar size="huge" />
            <br />
            <Button className="AddSurveyButton" size="big" color="teal" onClick={() => this.addSurveyHandler()}>Add Your Survey</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
});

export default connect(null, mapDispatchToProps)(withRouter(MainPage));
