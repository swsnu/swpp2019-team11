import React from 'react';
import { Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import './MakingOptions.css';

export const MakingOptions = (props) => (
  <div className="MakingOptions">
    <div id="optionNumber">
      {props.number}
:
      {' '}
    </div>
    <Input value = {props.content} className="OptionInput" placeholder="Write Options..." onChange={(e) => props.contentHandler(e.target.value, props.number)} />
    {' '}
    <br />
  </div>
);

export default withRouter(MakingOptions);
