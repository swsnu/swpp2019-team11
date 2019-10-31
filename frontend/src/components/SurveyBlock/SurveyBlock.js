import React from 'react';
import {Segment, Header, Button, Grid, Icon} from 'semantic-ui-react'
import {withRouter} from 'react-router'


const SurveyBlock = (props) => {

  return(
    <Grid padded>
      <Grid.Row style = {{width: '1000px'}} >
          <Segment style = {{height : '100px', width: '600px', 'border-top-left-radius' : '20px', 'border-bottom-left-radius' : '20px'}} attached = 'left' onClick = {() => {props.history.push('/survey/'+ props.id)}}>
            <Header size = 'big'>{props.title}</Header>
          </Segment>
          {props.search ? (<Button icon = 'cart arrow down' floated = 'right' attached = 'right' style = {{height : '99px', 'verticalAlign' : 'middle', 'border-top-right-radius' : '20px', 'border-bottom-right-radius' : '20px'}}><Icon name = 'cart arrow down'/></Button>) : null}
      </Grid.Row>
    </Grid>
  )
}


export default withRouter(SurveyBlock)