import React, { Component } from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProfileButton from '../../components/ProfileButton/ProfileButton';

class MainPage extends Component {
  addSurveyHandler = () => {
    this.props.history.push('/upload');
  }


  render() {
    return (
      <Grid textAlign="center">
        <Grid.Row textAlign="right" colums={1}>
          <Grid.Column>
            <ProfileButton style={{ margin: '25px' }} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} style={{ height: '60.3vh' }} verticalAlign="middle">
          <Grid.Column>
            <Header style={{ 'font-size': '4em' }} size="huge" color="teal" textAlign="center">
              surBing
            </Header>
            <SearchBar size="huge" />
            <br />
            <Button size="big" color="teal" onClick={() => this.addSurveyHandler()}>Add Your Survey</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>

    );
  }
}

export default MainPage;
