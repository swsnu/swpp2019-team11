import React from 'react';
import {
  Segment, Grid, Sticky, Header, Menu
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import ProfileButton from '../ProfileButton/ProfileButton';

export const TopBar = (props) => (
  <Sticky className="TopBar">
    <Segment style={{ height: '100px' }}>
      <Grid colums={3} style={{ 'min-width': '800px' }}>
        <Grid.Row verticalAlign="middle" style={{marginBottom:'0px'}}>
          <Grid.Column textAlign="center" style={{ minWidth: 200, marginRight: '50px' }}><Header className="logo" style={{ 'font-size': '4em', cursor: 'pointer' }} onClick={() => { props.history.push('/main'); }} size="huge" color="teal" textAlign="center">surBing</Header></Grid.Column>
          <Grid.Column style={{ minWidth: 300 }}>{props.searchBar ? (<SearchBar size="huge" minWidth="300px" width="calc(100vw - 500px)" />) : null}</Grid.Column>
          <Grid.Column style={{ minWidth: '180px' }} floated="right"><ProfileButton /></Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Menu className = "UtilBar">
        <Menu.Item
          name='editorials'
          //onClick={this.handleItemClick}
        >
          Editorials
        </Menu.Item>

        <Menu.Item
          name='reviews'
          //onClick={this.handleItemClick}
        >
          Reviews
        </Menu.Item>

        <Menu.Item
          name='upcomingEvents'
          //onClick={this.handleItemClick}
        >
          Upcoming Events
        </Menu.Item>
    </Menu>
  </Sticky>
);

export default withRouter(TopBar);
