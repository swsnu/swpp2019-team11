import React from 'react';
import {Segment, Header} from 'semantic-ui-react'


const SurveyBlock = (props) => {

  return(
    <Segment style = {{height : '100px'}} onClick = {() => {this.props.push('/survey/'+ props.id)}}>
      <Header size = 'big'>{props.title}</Header>
      
    </Segment>
  )
}


export default SurveyBlock