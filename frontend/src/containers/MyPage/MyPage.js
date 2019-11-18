import React, { Component } from 'react';
import {
  Grid, Label, Table, Button, Header, Image, Icon, Menu, Segment, Sidebar
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import TopBar from '../../components/TopBar/TopBar';
import SurveyOngoing from '../../components/MyPage/SurveyOngoing/SurveyOngoing';
import SurveyCompleted from '../../components/MyPage/SurveyCompleted/SurveyCompleted';
import * as actionCreators from '../../store/actions/index';
import SurveyBlock from '../../components/SurveyBlock/SurveyBlock';

export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  getCart: () => dispatch(actionCreators.getCart()),
});

export const mapStateToProps = (state) => ({
  survey_list : state.ct.survey_list,
});

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

  getContents = () => {
    
    if (this.props.survey_list.length != 0){ 
      var content = this.props.survey_list.map((cur) => (
        <Grid columns={1} >
          <Grid.Column style={{ minWidth: 830 }}>
            <SurveyBlock survey={cur} search={false} />
          </Grid.Column>
        </Grid>
      ));
    }
    else {
      var content = (<Grid><h2> The Cart is Empty! </h2></Grid>);
    }
    return (<Grid>{content}</Grid>);
};

  render() {
    const cartContents = this.getContents();
    const Cart = (
      <div>
        <h2>Cart page...</h2>
        {cartContents}
      </div>
    );

    const selectmenu=()=>{
      if (this.state.clickedMenu == 0) return (
        <div>
         <SurveyOngoing/>
        </div>
      );
      else if (this.state.clickedMenu == 1) return (
        <div>
         <SurveyCompleted/>
        </div>
      );
      else return Cart;
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
          <Menu.Item as='a' onClick = {() =>{ this.setState({clickedMenu : 0}); } } >
            My Ongoing Survey
          </Menu.Item>
          <Menu.Item as='a' onClick = {() =>{ this.setState({clickedMenu : 1}); } }>
            My Completed Survey
          </Menu.Item>
          <Menu.Item as='a' onClick = {() =>{ this.setState({clickedMenu : 2}); } }>
            Cart
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher style={{minHeight: 800}}>
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
