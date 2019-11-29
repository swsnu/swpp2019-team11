import React from 'react';
import { Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

export const MakingOptions = (props) => (
  <div className="MakingOptions">
    {props.number}
:
    <Input className="OptionInput" onChange={(e) => props.content(e.target.value, props.number)} />
    {' '}
    <br />
  </div>
);

export default withRouter(MakingOptions);
