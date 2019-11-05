import React, {Component} from 'react'
import {Button, Grid, Header, Segment} from 'semantic-ui-react'
import Response from './Response/Response'



class ItemBlock extends Component{

  state = {
    checked : false,
    response_block : []
  }

  render(){
    this.props.response.map((response, response_index) => {
      this.state.response_block[response_index] = <Response id = {response['respondant_id']} content = {response['content']} />
      return(response)

    })
    return(
      <Segment disabled = {!this.state.checked} padded>
        <Grid columns={1}>
          <Grid.Row verticlaAlign = 'middle'>
            <Header floated = 'left' color = 'olive' style={{'font-size': '22px', 'margin-left': '17px'}}>
              Q{this.props.id}: 
            </Header>
            <Header floated = 'left' color = 'grey' style={{'font-size': '22px'}}>
              {this.props.title}
            </Header>
          </Grid.Row>
        </Grid>
        <Segment style = {{padding : -20, height}}>
          {this.state.response_block}
        </Segment>
      </Segment>
    )
  }
}

export default ItemBlock

