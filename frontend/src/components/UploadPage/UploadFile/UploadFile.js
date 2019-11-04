import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react';
import ReactFileReader from 'react-file-reader';
import CSVconverter from '../../CSVconverter/CSVconverter';


class UploadFile extends Component {
  state = {
    converted_file: '',

  }

  render() {
    return (
      <div className="ui yellow segment">
        <Header style={{ 'font-size': '2em', 'margin-left': '10px' }} size="huge" color="yellow">1. Upload</Header>
        <div style={{ 'font-size': '20px', color: '#663300', 'margin-left': '20px' }}><strong>.csv file</strong></div>
        <ReactFileReader handleFiles={(file) => { this.setState({ ...this.state, converted_file: CSVconverter(file[0], true), filename: file[0].filename }); }} fileTypes={['.csv']} multipleFiles={false}>
          <Button style={{ margin: '10px' }}>Upload</Button>
          {this.state.filename}
        </ReactFileReader>
        <div align="right">
          <Button
            align="right"
            style={{ marginRight: '20pt', width: '100pt' }}
            onClick={() => { this.props.uploadOnClick(this.state.converted_file); }}
            disabled={this.props.progress != 0}
          >
        Continue
          </Button>
        </div>
      </div>
    );
  }
}
export default UploadFile;
