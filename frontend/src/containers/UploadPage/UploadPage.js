import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import {connect} from 'react-redux'
import * as actionCreators from '../../store/actions/index'


import UploadFile from '../../components/UploadPage/UploadFile/UploadFile';
import EditItem from '../../components/UploadPage/EditItem/EditItem';
import Submit from '../../components/UploadPage/Submit/Submit';
import TopBar from '../../components/TopBar/TopBar';



const mapDispatchToProps = (dispatch) => {
  return {
    onUpload : (survey) => {dispatch(actionCreators.uploadSurvey(survey))}
  }
}

class UploadPage extends Component {
    state = {
      progress: 0,
      parsed_file: null,
    }

    componentDidMount = () => {
      this.setState({ progress: 0 });
    }

    UploadHandler = (file) => {
      if (this.state.progress == 0 && file!=null) {
        this.setState({ ...this.state, progress: 1, parsed_file: file });
      }
    }
    BackHandler = () => {
      if(this.state.progress==1) this.setState({...this.state, progress : 0})
      else if(this.state.progress==2) this.setState({...this.state, progress : 1})
    }

    EditHandler = (check_list) => {
      if (this.state.progress == 1){
        this.state.parsed_file['item'] = this.state.parsed_file['item']
          .filter((item, item_index) => check_list[item_index] )
        this.setState({ ...this.state, progress: 2});
      }
    }

    SubmitHandler = () => {
      if (this.state.progress == 2){
        console.log(this.state.parsed_file)
        this.props.onUpload(this.state.parsed_file)
        this.props.history.push('/main/');
      }
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
            <EditItem survey = {this.state.parsed_file} progress={this.state.progress} backOnClick = {this.BackHandler} editOnClick={this.EditHandler} />
            <Submit progress={this.state.progress} backOnClick = {this.BackHandler} submitOnClick={this.SubmitHandler} />
          </Segment>
        </div>
      );
    }
}

export default connect(null, mapDispatchToProps)(UploadPage);
