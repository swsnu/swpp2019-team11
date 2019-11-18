import React from 'react';
import {
  Segment, Grid, Sticky, Header, Menu
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

export const UtilBar = (props) => (
  <Sticky className="UtilBar">
    <Menu>
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

export default withRouter(UtilBar);
