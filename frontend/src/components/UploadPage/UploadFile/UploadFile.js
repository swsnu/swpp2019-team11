import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

class UploadFile extends Component{
    render(){
        return(
            <div class="ui yellow segment" >
                <Header style={{ 'font-size': '2em' }} size="huge" color="yellow">1. Upload</Header>
                <div style={{"font-size":"20px", "color":"#663300"}}><strong>.csv file</strong></div>
                <div align="right">
                    <button class="ui yellow basic button" align="right" style={{"marginRight":"20pt", "width":"100pt"}} > Continue </button>
                </div>
            </div>
        );
    }
}
export default UploadFile;