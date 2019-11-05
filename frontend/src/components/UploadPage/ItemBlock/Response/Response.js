import React from 'react'
import {Button, Grid, Header, Segment} from 'semantic-ui-react'

const Response = (props) => {
  return (
      <Header as='h5' block style = {{marginTop : 3, marginBottom : 2, marginLeft : 0, marginRight : 0}}>
        {props.content}
      </Header>
  )
}

export default Response