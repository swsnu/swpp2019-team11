import React, { Component } from 'react';
import SurveyItem from '../../components/SurveyDetailPage/SurveyItem/SurveyItem';
import { Header, Icon, Grid } from 'semantic-ui-react';

class SurveyDetailPage extends Component {
  render() {
    return (
      <div className = "SurveyDetailPage">
        <Grid columns={2} divided>
          <Grid.Row style = {{margin: 20, border: '1px solid grey', borderRadius: 20}}>
            <Grid.Column style = {{width: '65%', 'font-size':'4em'}}>
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