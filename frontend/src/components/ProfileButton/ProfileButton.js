import React, { Component } from 'react';
import {
  Button, Dropdown, Icon, Segment,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import './ProfileButton.css';

export const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(actionCreators.logOut()),
  getUserInfo: () => dispatch(actionCreators.getUserInfo()),
});

export const mapStateToProps = (state) => ({
  username: state.us.info.username,
  point: state.us.info.point,
});

export class ProfileButton extends Component {
  logoutHandler = () => {
    this.props.logOut().then(() => { window.location.assign('/main'); });
  };

  componentDidUpdate(prev) {
    if (prev != this.props) {
      this.forceUpdate();
    }
  }

  render() {
    if (this.props.username != '') {
      return (
        <Dropdown className="DropDownClass" id="DropDownClass" style={this.props.style} as={Button} text="Profile" size="large" direction="left">
          <Dropdown.Menu className="Menu" id="Menu" as={Segment}>
            <Dropdown.Item id="upperItem" onClick={() => this.props.history.push('/mypage/')}>
              <Icon centered name="user circle" className="UserIcon" size="huge" />
              <div id="username">
                {'Hello, '}
                {this.props.username}
                {' !'}
              </div>
              <div id="userpoint">
                <div id="blank">{' '}</div>
                <div id="mypointText">
My Point:
                  {' '}
                </div>
                {this.props.point}
              </div>
            </Dropdown.Item>
            <Dropdown.Item className="logOut" id="logOut" onClick={() => this.logoutHandler()} basic as={Button} floating>
              <Icon id="keyIcon" name="key" />
            Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }

    return (
      <Button
        id="LoginButton"
        icon="user"
        size="large"
        style={{
          margin: 25, backgroundColor: '#a3c6c4', width: 110, color: 'black',
        }}
        onClick={() => this.props.history.push('/login')}
      >
LogIn
      </Button>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileButton));
