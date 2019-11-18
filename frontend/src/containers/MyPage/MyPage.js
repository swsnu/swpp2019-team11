import React, { Component } from 'react';
import {
  Grid, Label, Table, Button, Header, Image, Icon, Menu, Segment, Sidebar
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import TopBar from '../../components/TopBar/TopBar';
import SurveyOngoing from '../../components/MyPage/SurveyOngoing/SurveyOngoing';
import * as actionCreators from '../../store/actions/index';

export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
});
/*
export const mapStateToProps = (state) => ({
});
*/

export class MyPage extends Component {
  state = {
    clickedMenu: 0
  }
  componentDidMount() {
    /*this.props.checklogIn()
      .then(() => {
        this.setState({clickedMenu : 0})
        //this.props.onSurveyDetail(this.props.match.params.id);
      }) 
      .catch(() => { this.props.history.push('/login/'); });*/
  }
  
  render() {
    const noSurvey = (
      <div>
        <Header as='h3'>No Survey yet. Let's make a survey!</Header>
      </div>
    );


    const selectmenu=()=>{
      if (this.state.clickedMenu == 0) return (
        <div>
         <SurveyOngoing/>
        </div>
      );
      else return noSurvey;
    }
    
    return (
      
      <div className="myPage">
        <TopBar searchBar />
        <Sidebar.Pushable as ={Segment}>
        <Sidebar
          as = {Menu}
          icon='labeled'
          inverted
          visible
          vertical
          width='thin'
        >
          <Menu.Item as='a' onClick = {() =>{ this.setState({clickedMenu : 0}); console.log(this.state.clickedMenu) } } >
            My Ongoing Survey
          </Menu.Item>
          <Menu.Item as='a' onClick = {() =>{ this.setState({clickedMenu : 1}); console.log(this.state.clickedMenu) } }>
            My Completed Survey
          </Menu.Item>
          <Menu.Item as='a' onClick = {() =>{ this.setState({clickedMenu : 2}); console.log(this.state.clickedMenu)} }>
            Cart
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment basic>
            <Header as='h3'>Application Content</Header>
            {selectmenu()}
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          </Segment>
        </Sidebar.Pusher>
        
      </Sidebar.Pushable>
        
      </div>
    );
  }
}
export default connect(null, mapDispatchToProps)(MyPage);
