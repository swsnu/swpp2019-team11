import React from 'react';
import {Segment, Header} from 'semantic-ui-react'


const SurveyBlock = (props) => {

  return(
    <Segment style = {{height : '80px'}} onClick = {() => {this.props.push('/survey/'+ props.id)}}>
      <Header >{this.props.title}</Header>
      
    </Segment>
  )
}


export default SurveyBlock