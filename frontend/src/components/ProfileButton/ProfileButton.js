import React from 'react';
import { Button, Dropdown, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';


const ProfileButton = (props) => {
  const myCartHandler = () => {
    props.history.push('/mycart');
  };
  const logoutHandler = () => {
    props.history.push('/login');
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

export default withRouter(ProfileButton);
