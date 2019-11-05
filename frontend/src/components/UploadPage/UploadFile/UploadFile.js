import React, { Component } from 'react';
import { Header, Button, Segment } from 'semantic-ui-react';
import ReactFileReader from 'react-file-reader';
import CSVconverter from '../../CSVconverter/CSVconverter';


class UploadFile extends Component {
  state = {
    converted_file: '',
    filename : 'null'

  }

  converter = (file) => {
    this.setState({...this.state, converted_file : file})
  }

  render() {
    return (
      <Segment color = 'yellow'>
        <Header style={{ 'font-size': '2em', 'margin-left': '10px' }} size="huge" color="yellow">1. Upload</Header>
        <div style={{ 'font-size': '20px', color: '#663300', 'margin-left': '20px' }}><strong>.csv file</strong></div>
        <ReactFileReader handleFiles={(file) => { CSVconverter(this.converter, file[0] , true); this.setState({ ...this.state, filename: file[0].name })}} fileTypes={['.csv']} multipleFiles={false}>
          <Button floated = 'left' style={{ margin: '10px' }}>Upload</Button>
          <Header floated = 'left' style = {{'padding-left' : 50}} color = 'teal'>{this.state.filename}</Header>
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
      </Segment>
    );
  }
}
export default UploadFile;
