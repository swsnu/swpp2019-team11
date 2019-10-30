import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import ProfileButton from '../../components/ProfileButton/ProfileButton';
import SearchBar from '../../components/SearchBar/SearchBar';


class SearchResultPage extends Component {



  render() {
    return (
      <div>
        <Segment style={{ height: '100px' }}>
          <Grid colums={3} style = {{'min-width' : '800px'}}>
            <Grid.Row verticalAlign="middle" >
              <Grid.Column textAlign="center" style={{ minWidth: 200, marginRight : '50px' }}><Header style={{ 'font-size': '4em', 'cursor':'pointer' }} onClick = {() => {this.props.history.push('/main')}} size="huge" color="teal" textAlign="center">surBing</Header></Grid.Column>
              <Grid.Column  style = {{minWidth : 300}} ><SearchBar size="huge" minWidth = '300px' width = {'calc(100vw - 500px)'} /></Grid.Column>
              <Grid.Column style={{ minWidth: '180px' }} floated="right" ><ProfileButton /></Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Grid colums = {2} divided>
          <Grid.Row>
            <Grid.Column style = {{minWidth : '300px', maxWidth : '300px'}}> awd </Grid.Column>
            <Grid.Column width = {8}> dawawdawdawdawdawdad </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default SearchResultPage;
