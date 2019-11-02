import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import UploadFile from '../../components/UploadPage/UploadFile/UploadFile';
import EditItem from '../../components/UploadPage/EditItem/EditItem';
import Submit from '../../components/UploadPage/Submit/Submit';
import TopBar from '../../components/TopBar/TopBar';

function checkFilename(filename) {
  const filelen = filename.length;
  const lastdot = filename.lastIndexOf('.');
  const fileext = filename.substring(lastdot, filelen).toLowerCase();
  return fileext;
}
class UploadPage extends Component {
    state = {
      admitCheck: false,
      progress: 0,
    }

    componentDidMount = () => {
      this.setState({ admitCheck: false, progress: 0 });
    }

    AdmitButtonHandler = () => {
      if (this.state.admitCheck == false) this.setState({ ...this.state, admitCheck: true });
      else this.setState({ ...this.state, admitCheck: false });
    }

    UploadHandler = () => {
      if (this.state.progress == 0) this.setState({ ...this.state, progress: 1 });
    }

    inputButton = () => (
      <div
        className="ui icon input"
        style={{ 'margin-top': '10px', 'margin-left': '10px' }}
      >
        <input id="input" type="file" onChange={() => { this.fileHandler(document.getElementById('input').files[0]); }} />
        <i className="search icon" />
      </div>
    )

    fileHandler = (file) => {
      const reader = new FileReader();
      if (!file) alert('file is null');
      if (checkFilename(file.name) == '.csv') {
        let fileData = ' ';
        reader.onload = (e) => {
          fileData = e.target.result;
        };
        if (fileData) fileData += ' '; // useless.
      }
    }

    EditHandler = () => {
      if (this.state.progress == 1) this.setState({ ...this.state, progress: 2 });
    }

    SubmitHandler = () => {
      if (this.state.progress == 2) this.props.history.push('/main/');
    }

    render() {
      return (
        <div>
          <TopBar />
          <Segment style={{ minHeight: '10vh' }}>
            <UploadFile
              inputButton={this.inputButton()}
              uploadOnClick={() => this.UploadHandler()}
              progress={this.state.progress}
            />
            <EditItem progress={this.state.progress} editOnClick={() => this.EditHandler()} />
            <Submit progress={this.state.progress} submitOnClick={() => this.SubmitHandler()} />
          </Segment>
        </div>
      );
    }
}
export default UploadPage;
