import React from 'react';
import { Segment, Checkbox, Input, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

export const MakingOptions = (props) => {
  return (
    <div>
      <Input onChange={(e) => props.content(e.target.value, props.id)}/> <br />
    </div>
  );
};

export default withRouter(MakingOptions);
