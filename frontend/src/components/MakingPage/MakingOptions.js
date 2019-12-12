import React from 'react';
import { Input, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import './MakingOptions.css';

export const MakingOptions = (props) => (
  <div className="MakingOptions">
    <div id="optionNumber">
      {props.number}
:
      {' '}
    </div>
    <Input error={props.error} value={props.content} className="OptionInput" placeholder="Write Options..." onChange={(e) => props.contentHandler(e.target.value, props.number)} />
    <Icon style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => props.deleteHandler(props.number)} name="x" />
    {' '}
    <br />
  </div>
);

export default withRouter(MakingOptions);
