import React, { Component } from 'react';
import {
  Menu, Segment, Sidebar,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import TopBar from '../../components/TopBar/TopBar';
import SurveyOngoing from '../../components/MyPage/SurveyOngoing/SurveyOngoing';
import SurveyCompleted from '../../components/MyPage/SurveyCompleted/SurveyCompleted';
import Cart from '../../components/MyPage/Cart/Cart';
import * as actionCreators from '../../store/actions/index';

export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  getCart: () => dispatch(actionCreators.getCart()),
  getSurveyOngoing: () => dispatch(actionCreators.getMyOngoingSurveys()),
  getSurveyAll: () => dispatch(actionCreators.getMyCompletedSurveys()),
});

export const mapStateToProps = (state) => ({
  cart_list: state.ct.survey_list,
  survey_list: state.svl.survey_list,
  ongoing_survey_list: state.svl.ongoing_survey_list,
});

export class MyPage extends Component {
  state = {
    clickedMenu: 0,
  }

  componentDidMount() {
    this.props.checklogIn()
      .then(() => {
      })
      .catch(() => { this.props.history.push('/login/'); });
    this.props.getSurveyOngoing();
    this.props.getCart();
    this.props.getSurveyAll();
  }

  render() {

    const selectmenu = () => {
      if (this.state.clickedMenu == 0) {
        return (
          <div>
            <SurveyOngoing />
          </div>
        );
      } if (this.state.clickedMenu == 1) {
        return (
          <div>
            <SurveyCompleted />
          </div>
        );
      } else {
        return (
          <div>
            <Cart />
          </div>
        );
      }
    };

    return (
      <div className="myPage">
        <TopBar searchBar style={{ backgroundColor: 'white', 'z-index': 1 }} />
        <Sidebar.Pushable as={Segment} style={{ paddingTop: 100, 'z-index': 2 }}>
          <Sidebar
            as={Menu}
            icon="labeled"
            inverted
            visible
            vertical
            width="thin"
          >
            <Menu.Item className = "OngoingSurvey" onClick={() => { this.setState({ clickedMenu: 0 }); }}>
              My Ongoing Survey
            </Menu.Item>
            <Menu.Item className = "CompletedSurvey" onClick={() => { this.setState({ clickedMenu: 1 }); }}>
              My Completed Survey
            </Menu.Item>
            <Menu.Item className = "Cart" onClick={() => { this.setState({ clickedMenu: 2 }); }}>
              Cart
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher style={{ minHeight: 800 }}>
            <Segment basic>
              {selectmenu()}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
