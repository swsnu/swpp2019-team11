import React, { Component } from 'react';
import { Header, Button, Segment } from 'semantic-ui-react';
import ReactFileReader from 'react-file-reader';
import CSVconverter from '../../CSVconverter/CSVconverter';


class UploadFile extends Component {
  state = {
    converted_file: '',
    filename: 'upload your file!',

  }

  converter = (file) => {
    this.setState({ ...this.state, converted_file: file });
  }

  render() {
    return (
      <Segment disabled={this.props.progress != 0} style={{ height: 150 }} color="yellow">
        <Header style={{ fontSize: '2em', marginLeft: '10px' }} size="huge" color="yellow">1. Upload</Header>
        <div style={{ 'font-size': '20px', color: '#663300', marginLeft: '20px' }}><strong>.csv file</strong></div>
        <ReactFileReader handleFiles={(file) => { CSVconverter(this.converter, file[0], true); this.setState({ ...this.state, filename: file[0].name }); }} fileTypes={['.csv']} multipleFiles={false}>
          <Button disabled={this.props.progress != 0} floated="left" style={{ margin: '10px' }}>Upload</Button>
        </ReactFileReader>
        <Header size="big" floated="left" style={{ paddingTop: 15 }} color="teal">{this.state.filename}</Header>
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
