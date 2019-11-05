import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';


import UploadFile from '../../components/UploadPage/UploadFile/UploadFile';
import EditItem from '../../components/UploadPage/EditItem/EditItem';
import Submit from '../../components/UploadPage/Submit/Submit';
import TopBar from '../../components/TopBar/TopBar';


class UploadPage extends Component {
    state = {
      admitCheck: false,
      progress: 0,
      parsed_file: null,
    }

    componentDidMount = () => {
      this.setState({ admitCheck: false, progress: 0 });
    }

    AdmitButtonHandler = () => {
      if (!this.state.admitCheck) this.setState({ ...this.state, admitCheck: true });
      else this.setState({ ...this.state, admitCheck: false });
    }

    UploadHandler = (file) => {
      if (this.state.progress == 0) {
        this.setState({ ...this.state, progress: 1, parsed_file: file });
        console.log(file)
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
              uploadOnClick={this.UploadHandler}
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
