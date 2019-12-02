import React, { Component } from 'react';
import {
  Menu, Segment, Sidebar,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import TopBar from '../../components/TopBar/TopBar';
import * as actionCreators from '../../store/actions/index';
import TableForm from '../../components/TableForm/TableForm';
import './MyPage.css';


export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  getCart: () => dispatch(actionCreators.getCart()),
  getSurveyOngoing: () => { dispatch(actionCreators.getMyOngoingSurveys()); },
  getUserInfo: () => dispatch(actionCreators.getUserInfo()),
  getSurveyAll: () => dispatch(actionCreators.getMyCompletedSurveys()),
});

export const mapStateToProps = (state) => ({
  cart_list: state.ct.survey_list,
  survey_list: state.svl.survey_list,
  ongoing_survey_list: state.svl.ongoing_survey_list,
  username: state.us.info.username,
  point: state.us.info.point,
});

export class MyPage extends Component {
  state = {
    clickedMenu: 0,
  }

  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      this.forceUpdate();
    }
  }

  componentDidMount() {
    this.props.checklogIn()
      .then(() => {
        this.props.getUserInfo();
      })
      .catch(() => { this.props.history.push('/login/'); });
    this.props.getSurveyOngoing();
    this.props.getCart();
    this.props.getSurveyAll();
  }

  selectmenu = () => {
    if (this.state.clickedMenu == 0 && this.props.ongoing_survey_list) {
      return (
        <div className="SurveyOngoing">
          <h1 id="ongoingTitle">Ongoing Survey</h1>
          <br />
          <TableForm id="ongoingTable" content={this.props.ongoing_survey_list} />
        </div>
      );
    }
    if (this.state.clickedMenu == 1 && this.props.survey_list) {
      return (
        <div className="SurveyCompleted">
          <h1 id="openedTitle">Opened Survey</h1>
          <br />
          <TableForm content={this.props.survey_list} />
        </div>
      );
    }
    if (this.state.clickedMenu == 2 && this.props.cart_list) {
      return (
        <div className="Cart">
          <h1 id="cartTitle">Cart</h1>
          <br />
          <TableForm content={this.props.cart_list} />
        </div>
      );
    }

    return null;
  };


  render() {
    return (
      <div className="myPage">
        <TopBar style={{ backgroundColor: 'white', 'z-index': 1 }} username={this.props.username} point={this.props.point} />
        <Sidebar.Pushable as={Segment} style={{ paddingTop: 100, 'z-index': 2 }}>
          <Sidebar
            id="sidebar"
            as={Menu}
            icon="labeled"
            inverted
            visible
            vertical
          >
            <Menu.Item className="OngoingSurvey" id="ongoing" onClick={() => { this.setState({ clickedMenu: 0 }); }}>
              My Ongoing Survey
            </Menu.Item>
            <Menu.Item className="CompletedSurvey" id="completed" onClick={() => { this.setState({ clickedMenu: 1 }); }}>
              My Completed Survey
            </Menu.Item>
            <Menu.Item className="Cart" id="cart" onClick={() => { this.setState({ clickedMenu: 2 }); }}>
              Cart
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher id="sidebarPusher" style={{ minHeight: 800 }}>
            <Segment basic>
              {this.selectmenu()}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
