import React, { Component } from 'react';
import {
  Grid, Header, Segment, Button,
} from 'semantic-ui-react';
import ScrollArea from 'react-scrollbar';
import Response from './Response/Response';


class ItemBlock extends Component {
  state = {
    type: true,
    checked: true,
    response_block: [],
  }

  componentDidMount() {
    this.props.check(this.props.id, this.state.checked);
    this.props.type(this.props.id, this.state.type);
  }

  render() {
    this.props.response.map((response, response_index) => {
      this.state.response_block[response_index] = (
        <Response
          id={response.respondant_id}
          content={response.content}
        />
      );
      return (response);
    });
    return (
      <Segment
        style={this.state.checked ? { backgroundColor: '#E4F7BA' } : { backgroundColor: '#F15F5F' }}
        padded
      >
        <Grid columns={1}>
          <Grid.Row
            onClick={() => {
              this.props.check(this.props.id, !this.state.checked);
              this.setState({ ...this.state, checked: !this.state.checked });
            }}
            verticlaAlign="middle"
          >
            <Header floated="left" color="olive" style={{ 'font-size': '22px', 'margin-left': '17px' }}>
              Q
              {this.props.id + 1}
:
            </Header>
            <Header floated="left" color="black" style={{ 'font-size': '22px' }}>
              {this.props.title}
            </Header>
          </Grid.Row>
          <Grid.Row style={{ marginTop: -30, marginBottom: 20 }}>
            <Header floated="left" color="olive" style={{ 'font-size': '22px', 'margin-left': '17px' }}>
              Question Type:
              <Button
                style={{ marginLeft: 5 }}
                basic
                color="black"
                onClick={() => {
                  this.props.type(this.props.id, !this.state.type);
                  this.setState({ ...this.state, type: !this.state.type });
                }}
              >
                {this.state.type ? 'Subjective' : 'Selection'}
              </Button>
            </Header>
          </Grid.Row>
        </Grid>
        <ScrollArea speed={0.8} horizontal={false} style={{ maxHeight: 250, border: 'none' }}>
          <Segment style={{ padding: -20, border: 'none' }}>
            {this.state.response_block}
          </Segment>
        </ScrollArea>
      </Segment>
    );
  }
}


export default ItemBlock;
