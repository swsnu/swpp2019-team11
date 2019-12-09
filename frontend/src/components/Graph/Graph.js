import React, { Component } from 'react';
import {RadialChart, XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries, LineSeries} from 'react-vis';
import { Button, Segment } from 'semantic-ui-react';


class Graph extends Component {
  state = {
    isClicked : 0,
  }

  render(){
    return(
      <div>
        <Button.Group>
          <Button onClick={() => this.setState({isClicked : 0})}>Block</Button>
          <Button onClick={() => this.setState({isClicked : 1})}>Pie</Button>
          <Button onClick={() => this.setState({isClicked : 2})}>Line</Button>  
        </Button.Group>
        <Segment>
        <XYPlot height={300} width= {300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          {this.state.isClicked === 0 ? <VerticalBarSeries data={this.props.graph_block} /> :(
            this.state.isClicked === 1 ? <RadialChart data={this.props.graph_radial} width={300} height={300}/> : 
            <LineSeries data={this.props.graph_block} />) }
        </XYPlot>
        </Segment>
      </div>
    )
  }
};

export default Graph;
