import React, { Component } from 'react';
import {
  RadialChart, XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries,
} from 'react-vis';
import { Button, Segment } from 'semantic-ui-react';


class Graph extends Component {
  state = {
    isClicked: 0,
  }

  render() {
    return (
      <div>
        <Segment style={{ width: 330 }} textAlign="center">
          <Button.Group style={{ align: 'middle' }}>
            <Button onClick={() => this.setState({ isClicked: 0 })}>Block Chart</Button>
            <Button onClick={() => this.setState({ isClicked: 1 })}>Pie Chart</Button>
          </Button.Group>
          {this.state.isClicked === 0
          && (
          <XYPlot height={300} width={300}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickValues={this.props.tickValues} />
            <YAxis />
            <VerticalBarSeries data={this.props.graph_block} />
          </XYPlot>
          )}
          {this.state.isClicked === 1 && <RadialChart labelsRadiusMultiplier={0.5} style={{ fortSize: '10px' }} labelsAboveChildren showLabels data={this.props.graph_radial} width={300} height={300} />}
        </Segment>
      </div>
    );
  }
}

export default Graph;
