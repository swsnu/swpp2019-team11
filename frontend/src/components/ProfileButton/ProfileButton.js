import React, {Component} from 'react';
import { Button, Dropdown, Icon, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import './ProfileButton.css';

export const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(actionCreators.logOut()),
  getUserInfo: () => dispatch(actionCreators.getUserInfo()),
});

export class ProfileButton extends Component {
  
  logoutHandler = () => {
    this.props.logOut().then(() => { this.props.history.push('/login'); });
  };

  componentDidUpdate(prev) {
    if (prev != this.props){
      this.forceUpdate();
    }
  }

  render(){
    if (this.props.username != null) {
    return (
      <Dropdown className="DropDownClass" as={Button} text="Profile" color="teal" size="large" style={this.props.style} direction="left">
        <Dropdown.Menu className="Menu" as={Segment} >
          <Dropdown.Item id={"upperItem"}>
            <Icon centered name="user circle" className="UserIcon" size="huge" />
            <div id="username">{this.props.username}</div>
            <div id="userpoint">
              <div id="blank">{' '}</div>
              My Point: 
              {this.props.point == null && 0}
              {this.props.point != null && this.props.point}
            </div>
          </Dropdown.Item>
          <Dropdown.Item className="logOut" onClick={() => this.logoutHandler()}  basic as={Button} floating >
            <Icon name="key" />
            Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  else return(
    null
  );
  }

  
};

export default connect(null, mapDispatchToProps)(withRouter(ProfileButton));
