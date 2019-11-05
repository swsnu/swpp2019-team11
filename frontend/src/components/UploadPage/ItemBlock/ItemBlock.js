import React, {Component} from 'react'
import {Button, Grid, Header, Segment} from 'semantic-ui-react'
import Response from './Response/Response'
import ScrollArea from 'react-scrollbar'



class ItemBlock extends Component{

  state = {
    checked : true,
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
        <ScrollArea speed={0.8} horizontal={false} style = {{maxHeight : 250, border : 'none'}}>
          <Segment style = {{padding : -20, border : 'none'}}>
            {this.state.response_block}
          </Segment>
        </ScrollArea>
      </Segment>
    )
  }
}

export default ItemBlock

