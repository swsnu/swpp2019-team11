import UploadFile from '../../components/UploadPage/UploadFile/UploadFile';
import EditItem from '../../components/UploadPage/EditItem/EditItem';
import Submit from '../../components/UploadPage/Submit/Submit';
import ProfileButton from '../../components/ProfileButton/ProfileButton';
import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import TopBar from '../../components/TopBar/TopBar';
class UploadPage extends Component{
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