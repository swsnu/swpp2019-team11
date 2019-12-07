import React, { Component } from 'react';
import {RadialChart, XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries, LineSeries} from 'react-vis';
import { Button } from 'semantic-ui-react';


class Graph extends Component {
  state = {
    isClicked : 0,
  }

  render(){
    return(
      <div>
    <Button.Group>
      <Button onClick={() => this.setState({isClicked : 0})}>블럭</Button>
      <Button onClick={() => this.setState({isClicked : 1})}>파이</Button>
      <Button onClick={() => this.setState({isClicked : 2})}>선</Button>  
      </Button.Group>
<XYPlot height={300} width= {300}>
  <VerticalGridLines />
  <HorizontalGridLines />
  <XAxis />
  <YAxis />
  {this.state.isClicked === 0 ? <VerticalBarSeries data={this.props.graph_block} /> :(
this.state.isClicked === 1 ? <RadialChart data={this.props.graph_radial} width={300} height={300}/> : 
  <LineSeries data={this.props.graph_block} />) }
</XYPlot>
  </div>
    )
  }
};

export default Graph;
