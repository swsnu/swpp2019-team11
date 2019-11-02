import React from 'react';
import { Header, Button } from 'semantic-ui-react';


const UploadFile = (props) => (
  <div className="ui yellow segment">
    <Header style={{ 'font-size': '2em', 'margin-left': '10px' }} size="huge" color="yellow">1. Upload</Header>
    <div style={{ 'font-size': '20px', color: '#663300', 'margin-left': '20px' }}><strong>.csv file</strong></div>
    {props.inputButton}
    <div align="right">
      <Button
        align="right"
        style={{ marginRight: '20pt', width: '100pt' }}
        onClick={props.uploadOnClick}
        disabled={props.progress != 0}
      >
                    Continue
      </Button>
    </div>
  </div>
);
export default UploadFile;
