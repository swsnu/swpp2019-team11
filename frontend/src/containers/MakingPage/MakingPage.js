import React, { Component } from 'react';
import { Sticky, Segment } from 'semantic-ui-react';

export class MakingPage extends Component {
  render() {
    return (
      <div>
        <Sticky>
          <Segment>
            <h1>MakingPage</h1>
          </Segment>
        </Sticky>
      </div>
    ); }
}
export default MakingPage;
