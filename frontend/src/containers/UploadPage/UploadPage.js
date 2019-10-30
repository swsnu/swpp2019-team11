import UploadFile from '../../components/UploadPage/UploadFile/UploadFile';
import EditItem from '../../components/UploadPage/EditItem/EditItem';
import Submit from '../../components/UploadPage/Submit/Submit';
import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';

class UploadPage extends Component{
    render(){
        return (
        <div>
            <Segment style={{ minHeight: '10vh' }}>
                <UploadFile/>
                <EditItem/>
                <Submit/>
            </Segment>
        </div>
        );
    }
}
export default UploadPage;