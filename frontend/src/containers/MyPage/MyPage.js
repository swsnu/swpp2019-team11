import React, { Component } from 'react';
import {
  Menu, Segment, Sidebar, Button,
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
  getParticipating: ()=>dispatch(actionCreators.getParticipatingList()),
  getSurveyAll: () => dispatch(actionCreators.getMyCompletedSurveys()),
});

export const mapStateToProps = (state) => ({
  cart_list: state.ct.survey_list,
  participating_list: state.pt.survey_list,
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
        this.props.getSurveyOngoing();
        this.props.getCart();
        this.props.getSurveyAll();
        this.props.getParticipating()
      })
      .catch(() => { this.props.history.push('/login/'); });
    
  }

  selectmenu = () => {
    if (this.state.clickedMenu == 0 && this.props.ongoing_survey_list && this.props.survey_list) {
      return (
        <div className="SurveyOngoing">
          <h1 id="ongoingTitle">Ongoing Survey</h1>
          <br />
          {
            (this.props.ongoing_survey_list.length > 0)
            && <TableForm ongoing = {true} id="ongoingTable" content={this.props.ongoing_survey_list} slide={false} />
          }
          <h1 id="openedTitle">Opened Survey</h1>
          <br />
          {
            (this.props.survey_list.length > 0)
            && <TableForm content={this.props.survey_list} slide={false} />
          }
          {
            (this.props.ongoing_survey_list.length == 0 && this.props.survey_list.length == 0)
            && (
            <Segment id="noOnSurvey">
              <div id="ongoingTxt1">
                {'  '}
No Ongoing Survey you made.
              </div>
              <div id="ongoingTxt2">
                {'  '}
Let's make new Survey!
              </div>
              <Button id="moveMaking" onClick={() => this.props.history.push('/making/')}> Go to make New Survey </Button>
            </Segment>
            )
          }
        </div>
      );
    }
    if (this.state.clickedMenu == 1 && this.props.survey_list) {
      return (
        <div className="ParticipatedSurvey">
          <h1 id="cartTitle">Cart</h1>
          <br />
          {
            (this.props.participating_list.length > 0)
            && <TableForm content={this.props.participating_list} slide />
          }
          {
            (this.props.participating_list.length == 0)
            && (
            <Segment placeholder id="noOnSurvey">
              <div id="ongoingTxt1">
                {'  '}
No Surveys you have participated.
              </div>
              <div id="ongoingTxt2">
                {'  '}
How about participating to onGoing surveys?
              </div>
              <Button id="moveMaking" onClick={() => this.props.history.push('/participate/')}> Go to Participate to Survey </Button>
            </Segment>
            )
          }
        </div>
      );
    }
    if (this.state.clickedMenu == 2 && this.props.cart_list) {
      return (
        <div className="Cart">
          <h1 id="cartTitle">Cart</h1>
          <br />
          {
            (this.props.cart_list.length > 0)
            && <TableForm content={this.props.cart_list} slide />
          }
          {
            (this.props.cart_list.length == 0)
            && (
            <Segment placeholder id="noOnSurvey">
              <div id="ongoingTxt1">
                {'  '}
No Opened Survey in Your Cart.
              </div>
              <div id="ongoingTxt2">
                {'  '}
Let's search Survey to put in Cart!
              </div>
              <Button id="moveMaking" onClick={() => this.props.history.push('/main/')}> Go to search Survey </Button>
            </Segment>
            )
          }
        </div>
      );
    }

    return null;
  };


  render() {
    const menu = this.selectmenu();
    return (
      <div className="myPage">
        <TopBar menu="Mypage" style={{ backgroundColor: 'white', 'z-index': 1 }} username={this.props.username} point={this.props.point} />
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
              My Surveys
            </Menu.Item>
            <Menu.Item className="CompletedSurvey" id="completed" onClick={() => { this.setState({ clickedMenu: 1 }); }}>
              Participated Surveys
            </Menu.Item>
            <Menu.Item className="Cart" id="cart" onClick={() => { this.setState({ clickedMenu: 2 }); }}>
              My Cart
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher id="sidebarPusher" style={{ minHeight: 800 }}>
            <Segment basic>
              {menu}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
