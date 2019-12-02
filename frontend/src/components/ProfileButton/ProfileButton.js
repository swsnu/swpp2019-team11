import React, {Component} from 'react';
import { Button, Dropdown, Icon, Segment, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import './ProfileButton.css';

export const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(actionCreators.logOut()),
  getUserInfo: () => dispatch(actionCreators.getUserInfo()),
});

export const ProfileButton = (props) => {
  const logoutHandler = () => {
    props.logOut().then(() => { props.history.push('/login'); });
  };

  return (
    <Dropdown className="DropDownClass" as={Button} text="Profile" color="teal" size="large" style={props.style} direction="left">
      <Dropdown.Menu className="Menu" as={Segment}>
        <Dropdown.Item id={"upperItem"}>
          <Icon centered name="user circle" className="UserIcon" size="huge" />
        </Dropdown.Item>
        <Dropdown.Item id="secondItem">
          <p id="username">UserName</p>
          <p id="userpoint">My Point: </p>
        </Dropdown.Item>
        <Dropdown.Item className="logOut" onClick={() => logoutHandler()}  basic as={Button} floating >
          <Icon name="key" />
          Log Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default connect(null, mapDispatchToProps)(withRouter(ProfileButton));
