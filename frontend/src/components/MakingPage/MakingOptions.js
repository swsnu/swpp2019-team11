import React from 'react';
import { Segment, Checkbox, Input, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

export const MakingOptions = (props) => {
  return (
    <div className = "MakingOptions">
      <Input className = "OptionInput" onChange={(e) => props.content(e.target.value, props.number)}/> <br />
    </div>
  );
};

export default withRouter(MakingOptions);
