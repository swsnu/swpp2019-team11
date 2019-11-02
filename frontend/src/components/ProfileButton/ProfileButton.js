import React from 'react';
import { Button, Dropdown, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../../store/actions/index';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    logOut : (username, password) => dispatch(actionCreators.logOut()),
  }
}

const ProfileButton = (props) => {
  const myCartHandler = () => {
    props.history.push('/mycart');
  };
  const logoutHandler = () => {
    props.logOut().then(() => { props.history.push('/login'); });
  };

  return (
    <Dropdown className = 'Dropdown' as={Button} text="Profile" color="teal" size="large" style={props.style}>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => myCartHandler()} color="primary" basic as={Button} fluid icon>
          <Icon name="cart" />
          My Cart
        </Dropdown.Item>
        <Dropdown.Item onClick={() => logoutHandler()} color="teal" basic as={Button} fluid icon>
          <Icon name="key" />
          Log Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default connect(null, mapDispatchToProps)(withRouter(ProfileButton));
