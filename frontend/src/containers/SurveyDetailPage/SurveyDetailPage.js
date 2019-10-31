import React, { Component } from 'react';
import SurveyItem from '../../components/SurveyDetailPage/SurveyItem/SurveyItem';
import { Header, Icon, Grid } from 'semantic-ui-react';
import TopBar from '../../components/TopBar/TopBar';

class SurveyDetailPage extends Component {
  render() {
    return (
      <div className = "SurveyDetailPage">
        <TopBar searchBar = {true}/>
        <Grid columns={2} style = {{'min-width' : 800}} divided>
          <Grid.Row verticalAlign='middle' style = {{margin: 30, height: 130, border: '1px solid grey', 'box-shadow': '5px 3px 3px #BDBDBD', borderRadius: 10}}>
            <Grid.Column style = {{width: '65%', 'font-size':'3.5em'}}>
              <Header style = {{color: '#00B5AD'}} textAlign='center' vertical-align='middle'>
                Survey Title
              </Header>
            </Grid.Column>
            <Grid.Column textAlign='center' style = {{width: '35%', 'font-size':'4em'}}>
              <Icon size = 'large' name = 'hand point right outline' color='teal'/>
              <Icon size = 'large' name = 'hand point left outline' color='teal'/>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <SurveyItem />
      </div>
    )
  }
}

export default SurveyDetailPage;