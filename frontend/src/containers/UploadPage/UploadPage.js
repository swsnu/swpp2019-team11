import UploadFile from '../../components/UploadPage/UploadFile/UploadFile';
import EditItem from '../../components/UploadPage/EditItem/EditItem';
import Submit from '../../components/UploadPage/Submit/Submit';
import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import TopBar from '../../components/TopBar/TopBar';
class UploadPage extends Component{
    state = {
        admitCheck : false,
        progress : 0,
    }
    AdmitButtonHandler = () => {
        if (this.state.admitCheck == false) this.setState({...this.state, admitCheck: true});
        else this.setState({...this.state, admitCheck: false});
    }
    UploadHandler = () => {
        var next_pro = this.state.progress + 1;
        if (this.state.progress != 2 ) this.setState({...this.state, progress: next_pro});
        else this.state.push('/main/')
    }
    render(){
        return (
        <div>
            <Segment style={{ minHeight: '10vh' }}>
                <TopBar/>
                <UploadFile/>
                <EditItem/>
                <Submit/>
            </Segment>
        </div>
        );
    }
}
export default UploadPage;