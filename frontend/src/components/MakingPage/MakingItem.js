import React from 'react';
import { Segment, Checkbox } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

export const MakingItem = (props) => (
  <Segment style={{ 'min-height': '250px' }}>
    Q:
    {'  '}
    <input />
    <Checkbox toggle onChange={() => {props.onToggle()} }/>
  </Segment>
);
export default withRouter(MakingItem);