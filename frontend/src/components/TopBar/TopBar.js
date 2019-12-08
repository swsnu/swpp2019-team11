import React from 'react';
import {
  Segment, Grid, Sticky, Header, Menu,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import ProfileButton from '../ProfileButton/ProfileButton';
import './TopBar.css';

export const TopBar = (props) => (
  <Sticky className="TopBar" style={{ backgroundColor: '#ffffff', 'x-index': 1 }} context={props.context}>
    <Segment style={{ height: '100px', marginBottom: '-15px' }}>
      <Grid colums={3} style={{ 'min-width': '800px' }}>
        <Grid.Row verticalAlign="middle" style={{ marginBottom: '0px' }}>
          <Grid.Column textAlign="center" style={{ minWidth: 200, marginRight: '50px' }}><Header className="logo" id="logo" style={{ 'font-size': '4em', cursor: 'pointer' }} onClick={() => { props.history.push('/main'); }} size="huge" textAlign="center">surBing</Header></Grid.Column>
          <Grid.Column style={{ minWidth: 300 }}>{ props.searchBar ? (<SearchBar size="huge" minWidth="300px" width="calc(100vw - 500px)" />) : null}</Grid.Column>
          <Grid.Column style={{ minWidth: '180px' }} floated="right"><ProfileButton username={props.username} point={props.point} /></Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Menu size="big" className="UtilBar" pointing secondary style={{ borderRadius: '0px', marginBottom: '-15px', backgroundColor: 'white' }}>
      <Menu.Item
        className="Participate"
        active={props.menu == 'Participate'}
        onClick={() => props.history.push('/participate')}
      >
          Participate Survey
      </Menu.Item>

      <Menu.Item
        className="Making"
        active={props.menu == 'Making'}
        onClick={() => props.history.push('/making')}
      >
          Make Survey
      </Menu.Item>

      <Menu.Item
        className="Mypage"
        active={props.menu == 'Mypage'}
        onClick={() => props.history.push('/mypage')}
      >
          MyPage
      </Menu.Item>
    </Menu>
  </Sticky>
);

export default withRouter(TopBar);
