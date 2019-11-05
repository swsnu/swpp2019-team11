import React from 'react'
import {Button, Grid, Header, Segment} from 'semantic-ui-react'

const Response = (props) => {
  return (
      <Header as='h5' block style = {{marginTop : 2, marginBottom : 3, marginLeft : 0, marginRight : 0}}>
        {props.content}
      </Header>
  )
}

export default Response