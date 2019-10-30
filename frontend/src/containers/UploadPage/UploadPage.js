import UploadFile from '../../components/UploadPage/UploadFile/UploadFile';
import EditItem from '../../components/UploadPage/EditItem/EditItem';
import Submit from '../../components/UploadPage/Submit/Submit';
import ProfileButton from '../../components/ProfileButton/ProfileButton';
import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';

class UploadPage extends Component{
    render(){
        return (
        <div>
            <Segment style={{ minHeight: '10vh' }}>
                <Segment 
                    textAlign="left" style={{ minWidth: 200 }} width={2}>
                    <Header style={{ 'font-size': '4em' }} size="huge" color="teal" > 
                        surBing 
                        <Segment style={{ minWidth: 200 }} floated="right" width={2}><ProfileButton /></Segment>
                    </Header>
                </Segment>
                <UploadFile/>
                <EditItem/>
                <Submit/>
            </Segment>
        </div>
        );
    }
}
export default UploadPage;